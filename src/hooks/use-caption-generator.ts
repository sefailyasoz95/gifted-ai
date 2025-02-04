import { useState } from 'react';
import { generateGiftIdeas } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

interface GiftIdeaGeneratorResult {
  loading: boolean;
  error: string | null;
  generateGiftIdeasForImages: (files: File[], relationshipContext: string) => Promise<void>;
  giftIdeas: string[] | null;
}

export function useGiftIdeaGenerator(): GiftIdeaGeneratorResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [giftIdeas, setGiftIdeas] = useState<string[] | null>(null);

  const uploadToSupabase = async (file: File): Promise<string> => {
    // Create a unique file name to avoid collisions
    const fileName = `gifted-ai-${uuidv4()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('files')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw new Error(`Error uploading file: ${uploadError.message}`);
    }

    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('files')
      .getPublicUrl(uploadData.path);

    return publicUrl;
  };

  const generateGiftIdeasForImages = async (files: File[], relationshipContext: string) => {
    setLoading(true);
    setError(null);

    try {
      // Show upload toast
      const uploadToastId = toast.loading('Processing your photos...', {
        duration: Infinity,
      });

      const promises = files.map(async (file) => {
        // Convert image to base64
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result);  
            } else {
              reject(new Error('Failed to convert image to base64'));
            }
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        });

        // Upload to Supabase Storage
        const fileName = `gifted-ai-${uuidv4()}-${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('files')
          .upload(fileName, file);

        if (uploadError) {
          throw new Error(`Error uploading file: ${uploadError.message}`);
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('files')
          .getPublicUrl(uploadData.path);

        // Generate gift ideas using the full data URL
        const result = await generateGiftIdeas(base64, relationshipContext);

        if (!result.success || !result.giftIdeas) {
          // If generation fails, delete the uploaded file
          await supabase.storage
            .from('files')
            .remove([fileName]);
          throw new Error(result.error || 'Failed to generate gift ideas');
        }

        return { publicUrl, giftIdeas: result.giftIdeas };
      });

      const results = await Promise.all(promises);

      // Get client IP (this will be null on client side, will be set by server)
      let userIp = null;
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        userIp = data.ip;
      } catch (error) {
        console.error('Error getting IP:', error);
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      // Save to Supabase database
      const { error: insertError } = await supabase
        .from('posts')
        .insert({
          caption: results.flatMap((result) => result.giftIdeas).join('\n\n'), // Store all gift ideas in the caption field
          user_id: user?.id,
          user_ip: userIp,
          uploads: results.map((result) => result.publicUrl),
          app: 'gifted-ai'
        });

      if (insertError) {
        // If database insert fails, delete the uploaded files
        await Promise.all(results.map(async (result) => {
          await supabase.storage
            .from('files')
            .remove([result.publicUrl.split('/').pop()!]);
        }));
        
        throw new Error(`Error saving to database: ${insertError.message}`);
      }

      toast.dismiss(uploadToastId);
      setGiftIdeas(results.flatMap((result) => result.giftIdeas));
      toast.success('Gift ideas generated successfully! 🎁', {
        duration: 3000,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      toast.error('Failed to generate gift ideas. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    generateGiftIdeasForImages,
    giftIdeas,
  };
}
