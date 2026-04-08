import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import os from "os";
import path from "path";
import pdf from "pdf-parse/lib/pdf-parse.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const deleteTempFile = (filePath) => {
    const resolvedPath = path.resolve(filePath);
    if (resolvedPath.startsWith(path.resolve(os.tmpdir()))) {
        fs.promises.unlink(resolvedPath).catch((err) => console.error("Failed to delete temp file:", err));
    }
};

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== 'premium' && free_usage >= 10) {
        return res.json({ success: false, message: 'limit reached, Upgrade to continue' })
    }
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });
    await sql`INSERT INTO CREATIONS (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${result.response.text()}, 'article')`;

    if (plan !== 'premium') {
        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: {
                free_usage: free_usage + 1
            }
        })

    }
    res.json({
      success: true,
      content: result.response.text(),
    });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({ success: false, message: 'limit reached, Upgrade to continue' })
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",
        });

        const result = await model.generateContent({
        contents: [
            {
            role: "user",
            parts: [{ text: prompt }],
            },
        ],
        });
        const content = result.response.text()
        await sql`INSERT INTO CREATIONS (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })

        }

        res.json({ success: true, content })

    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}


export const generateImage = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, publish } = req.body;
        const plan = req.plan;

        if (plan !== 'premium') {
            return res.json({ success: false, message: 'This feature is only available for premium subscriptions' })
        }

        const formData = new FormData()
        formData.append('prompt', prompt)
        console.log("ClipDrop API Key:", process.env.CLIPDROP_API_KEY)
        const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY,
            },

            responseType: 'arraybuffer',
        })

        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;



        const {secure_url} = await cloudinary.uploader.upload(base64Image)

        await sql`INSERT INTO CREATIONS (user_id, prompt, content, type, publish) VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})`;

        res.json({ success: true, content: secure_url })    

    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}



export const removeImageBackground = async (req, res) => {
    try {
        const { userId } = req.auth();
        const image  = req.file;
        const plan = req.plan;

        if (plan !== 'premium') {
            return res.json({ success: false, message: 'This feature is only available for premium subscriptions' })
        }


        const {secure_url} = await cloudinary.uploader.upload(image.path,{
            transformation:[
                {
                    effect: 'background_removal',
                    background_removal:'remove_the_background'
                }
            ]
        })

        deleteTempFile(image.path);

        await sql`INSERT INTO CREATIONS (user_id, prompt, content, type) VALUES (${userId}, 'Remove background from image' , ${secure_url}, 'image')`;

        res.json({ success: true, content: secure_url })    

    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}


export const removeImageObject = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { object } = req.body;
        const image  = req.file;
        const plan = req.plan;

        if (plan !== 'premium') {
            return res.json({ success: false, message: 'This feature is only available for premium subscriptions' })
        }


        const {public_id} = await cloudinary.uploader.upload(image.path)

        deleteTempFile(image.path);

        const imageUrl = cloudinary.url(public_id, {
            transformation:[{effect: `gen_remove:${object}`}],
            resource_type: 'image',
            secure: true
        })

        await sql`INSERT INTO CREATIONS (user_id, prompt, content, type) VALUES (${userId}, ${`Removed ${object} from image`} , ${imageUrl}, 'image')`;

        res.json({ success: true, content: imageUrl })    

    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}
export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    if (!resume) {
      return res.json({
        success: false,
        message: "No resume file uploaded",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceeds allowed size (5MB).",
      });
    }

    // 📄 Read & parse PDF
    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `
You are a professional resume reviewer.

Review the following resume and provide:
1. Strengths
2. Weaknesses
3. Areas for improvement
4. ATS optimization tips
5. Final score out of 10

Resume Content:
${pdfData.text}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const content = result.response.text();

    await sql`
      INSERT INTO CREATIONS (user_id, prompt, content, type)
      VALUES (${userId}, 'Resume Review', ${content}, 'resume-review')
    `;

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.error("Resume Review Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const getCreations = async (req, res) => {
    try {
        const { userId } = req.auth();

        // Fetch the latest creations for this user
        const creations = await sql`
            SELECT id, prompt, content, type, created_at
            FROM CREATIONS
            WHERE user_id = ${userId}
            ORDER BY created_at DESC
        `;

        res.json({ success: true, creations });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};
