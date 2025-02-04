import { z } from 'zod'

export const imageValidator = z.object({
  file: z.instanceof(File).refine((file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    return validTypes.includes(file.type)
  }, 'File must be a valid image (JPEG, PNG, WEBP, or GIF)').refine((file) => {
    // 10MB limit
    return file.size <= 10 * 1024 * 1024
  }, 'File size must be less than 10MB'),
})

export const promptValidator = z.object({
  prompt: z.string().min(1).max(500).optional(),
})

export const generateCaptionValidator = z.object({
  imageUrl: z.string().url(),
  prompt: z.string().min(1).max(500).optional(),
})

export type GenerateCaptionInput = z.infer<typeof generateCaptionValidator>

export const generateGiftIdeasValidator = z.object({
  imageUrl: z.string(),
  relationshipContext: z.string().min(10, {
    message: "Please provide at least 10 characters about your relationship",
  }).max(500, {
    message: "Please keep your relationship context under 500 characters",
  }),
})

export type GenerateGiftIdeasInput = z.infer<typeof generateGiftIdeasValidator>

export const validateApiKey = (apiKey?: string) => {
  if (!apiKey) {
    throw new Error('API key is required')
  }
  
  if (apiKey !== process.env.GEMINI_API_KEY) {
    throw new Error('Invalid API key')
  }
}

export const validateContentType = (contentType?: string) => {
  if (!contentType?.includes('application/json')) {
    throw new Error('Content-Type must be application/json')
  }
}
