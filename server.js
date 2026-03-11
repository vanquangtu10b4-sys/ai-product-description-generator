import express from "express";
import OpenAI from "openai";

const app = express();

app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
    res.send("AI API running");
});

app.post("/generate", async (req, res) => {

    try {

        const { product } = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You write product descriptions." },
                { role: "user", content: `Write a product description for ${product}` }
            ]
        });

        res.json({
            text: completion.choices[0].message.content
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: "AI failed"
        });

    }

});


const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server started on port " + PORT);
});