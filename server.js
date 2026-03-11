import express from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// test homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// generate AI description
app.post("/generate", async (req, res) => {
    try {
        const { product } = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are an expert product copywriter." },
                { role: "user", content: `Write a short product description for ${product}` }
            ]
        });

        res.json({
            text: completion.choices[0].message.content
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "AI generation failed" });
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});