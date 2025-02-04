"use client";

import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useGiftIdeaGenerator } from "@/hooks/use-caption-generator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { trackVisitor } from "@/lib/visitor";
import type { Visitor } from "@/types/visitor";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface MediaFile extends File {
  preview?: string;
}

export function UploadZone() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [relationshipContext, setRelationshipContext] = useState("");
  const { loading, error, generateGiftIdeasForImages, giftIdeas } = useGiftIdeaGenerator();
  const [showResult, setShowResult] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [visitor, setVisitor] = useState<Visitor | null>(null);

  useEffect(() => {
    const initVisitor = async () => {
      try {
        const visitorData = await trackVisitor();
        if (visitorData) {
          setVisitor(visitorData);
        }
      } catch (error) {
        console.error('Error initializing visitor:', error);
      }
    };

    initVisitor();
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles((prev) => [...prev, ...newFiles]);
    setShowResult(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    multiple: true
  });

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview!);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    if (!relationshipContext) {
      toast.error("Please provide relationship context");
      return;
    }

    try {
      await generateGiftIdeasForImages([files[0]], relationshipContext);
      setDialogOpen(true);
    } catch (error) {
      console.error('Error generating gift ideas:', error);
      toast.error("Failed to generate gift ideas. Please try again.");
    }
  };

  const resetAll = () => {
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setFiles([]);
    setRelationshipContext("");
    setShowResult(false);
    setDialogOpen(false);
  };

  return (
    <div className="w-full max-w-3xl space-y-4">
      <div className="space-y-4">
        {files.length === 0 ? (
          <div
            {...getRootProps()}
            className={`border-2 backdrop-blur-lg border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"}`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </div>
              <div className="text-xs text-muted-foreground">
                JPG, JPEG, PNG, or WebP (max. 5MB)
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative w-full">
              <Carousel className="w-full">
                <CarouselContent>
                  {files.map((file, index) => (
                    <CarouselItem key={index} className="basis-full">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                        <Image
                          src={file.preview!}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.multiple = true;
                  input.accept = '.jpg,.jpeg,.png,.webp';
                  input.onchange = (e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files) {
                      onDrop(Array.from(files));
                    }
                  };
                  input.click();
                }}
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                Add More Photos
              </Button>
            </div>
          </div>
        )}

        <Textarea
          placeholder="Describe your relationship with the person (e.g., best friend for 5 years, loves hiking and photography)"
          value={relationshipContext}
          onChange={(e) => setRelationshipContext(e.target.value)}
          className="min-h-[100px]"
        />

        <Button
          onClick={handleSubmit}
          disabled={loading || files.length === 0 || !relationshipContext}
          className="w-full"
        >
          {loading ? "Generating Ideas..." : "Generate Gift Ideas"}
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Your Personalized Gift Ideas 🎁</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            {giftIdeas && giftIdeas.map((idea, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted">
                <div className="prose prose-sm dark:prose-invert">
                  {idea.split('\n').map((line, i) => (
                    <p key={i} className="my-1">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 mt-auto border-t">
            <Button onClick={resetAll} className="w-full">
              Start Over
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
