import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  try {
    console.log("Generating image...");
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'A cute, modern, friendly robot head avatar, minimalist 3D render, soft lighting, cyan and blue accents, dark background, highly detailed, centered, profile picture style, cute eyes.',
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        const publicDir = path.join(process.cwd(), 'public');
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir);
        }
        fs.writeFileSync(path.join(publicDir, 'demian-avatar.png'), Buffer.from(base64Data, 'base64'));
        console.log('Image saved to public/demian-avatar.png');
        break;
      }
    }
  } catch (error) {
    console.error('Error generating image:', error);
  }
}

main();
