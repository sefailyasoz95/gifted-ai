import { GoogleGenerativeAI } from "@google/generative-ai";
import { LocationInfo } from "./location-utils";

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

interface GiftIdeaResult {
  success: boolean;
  giftIdeas?: string[];
  error?: string;
}

interface PriceRange {
  minPrice: number;
  maxPrice: number;
}

export async function generateGiftIdeas(
  imageBase64: string,
  relationshipContext: string,
  locationInfo: LocationInfo,
  priceRange: PriceRange
): Promise<GiftIdeaResult> {
  try {
    // Remove the data URL prefix to get just the base64 data
    const base64Data = imageBase64.split(";base64,")[1];
    if (!base64Data) {
      throw new Error("Invalid image data format");
    }

    // Create model instance with the new model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are a gift advisor called Gifted-AI. Your task is to analyze the uploaded photos and relationship context to suggest thoughtful, personalized gift ideas. Focus on the interests of the mentioned person and style visible in the photos. Provide specific, creative gift suggestions that would be meaningful for their relationship. Respond in ${locationInfo.language} language and use ${locationInfo.currency} for pricing. Only suggest gifts within the specified price range of ${locationInfo.currencySymbol}${priceRange.minPrice} to ${locationInfo.currencySymbol}${priceRange.maxPrice}. If a gift will be bough for a kid who looks under 18, add this instagram account to the list of suggesstions: https://www.instagram.com/dekakids24/ , they are creating custom story books for kids with the help of AI`,
      generationConfig: {
        temperature: 0.7,
      },
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
- Gifts within the price range of ${locationInfo.currencySymbol}${priceRange.minPrice} to ${locationInfo.currencySymbol}${priceRange.maxPrice}
- Personal and customizable options
- Experiences they might enjoy together
- Items that reflect their shared memories or interests
- Local availability in ${locationInfo.country}

Please respond in ${locationInfo.language} language.

Format each suggestion with:
1. Gift name
2. Brief description of why it would be meaningful
3. Exact price in ${locationInfo.currencySymbol}`;

    // Generate content
    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const text = response.text();

    // Parse the text into an array of gift ideas and clean up markdown
    const giftIdeas = text
      .split("\n\n")
      .filter((idea) => idea.trim() !== "")
      .map((idea) => {
        // Remove markdown bold/italic formatting
        return idea
          .replace(/\*\*/g, "") // Remove bold
          .replace(/\*/g, "") // Remove italic
          .replace(/:/g, " -") // Replace colons with dashes
          .trim();
      });

    return {
      success: true,
      giftIdeas,
    };
  } catch (error) {
    console.error("Error generating gift ideas:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An error occurred while generating gift ideas",
    };
  }
}
