import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error('Missing NEXT_PUBLIC_GEMINI_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

interface GiftIdeaResult {
  success: boolean;
  giftIdeas?: string[];
  error?: string;
}

export async function generateGiftIdeas(
  imageBase64: string,
  relationshipContext: string
): Promise<GiftIdeaResult> {
  try {
    // Remove the data URL prefix to get just the base64 data
    const base64Data = imageBase64.split(';base64,')[1];
    if (!base64Data) {
      throw new Error('Invalid image data format');
    }

    // Create model instance with the new model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are a Valentine's Day gift advisor called Gifted-AI. Your task is to analyze the uploaded photos and relationship context to suggest thoughtful, personalized gift ideas. Focus on the couple's dynamics, interests, and style visible in the photos. Provide specific, creative gift suggestions that would be meaningful for their relationship.",
      generationConfig: {
        temperature: 0.7,
      }
    });

    // Prepare the image data
    const imageData = {
      inlineData: {
        data: base64Data,
        mimeType: "image/jpeg",
      },
    };

    // Prepare the prompt
    const prompt = `Based on this photo and the following relationship context: "${relationshipContext}", suggest 5 thoughtful Valentine's Day gift ideas that would be meaningful for this couple. Consider:
- Their visible interests and style in the photo
- The relationship context provided
- A mix of practical and romantic gifts
- Different price ranges (budget-friendly to premium)
- Personal and customizable options
- Experiences they might enjoy together
- Items that reflect their shared memories or interests

Format each suggestion with:
1. Gift name
2. Brief description of why it would be meaningful
3. Estimated price range`;

    // Generate content
    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const text = response.text();

    // Parse the text into an array of gift ideas
    const giftIdeas = text.split('\n\n').filter(idea => idea.trim() !== '');

    return {
      success: true,
      giftIdeas
    };

  } catch (error) {
    console.error('Error generating gift ideas:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while generating gift ideas'
    };
  }
}
