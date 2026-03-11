import express from "express";
import Groq from "groq-sdk";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());

// fix __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve static html
app.use(express.static(path.join(__dirname, "public")));

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.post("/generate", async (req, res) => {

    try {

        const { product } = req.body;

        const prompt = `
Write a short and attractive product description for:
${product}

Include:
- key features
- benefits
- marketing tone
- around 80 words
`;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama-3.1-8b-instant"
        });

        const text = completion.choices[0].message.content;

        res.json({ text });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            text: error.message
        });

    }

});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});