const express = require("express");
const cors = require("cors");  // Thêm CORS
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const app = express();
const PORT = 3000;
const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
    console.error("❌ API Key is missing!");
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

app.use(cors());
app.use(express.json());

app.post("/api/ai", async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        console.log("🔹 AI request:", prompt);
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });

        console.log("🔹 Full AI response:", JSON.stringify(response, null, 2));

        // Kiểm tra dữ liệu trả về từ Google API
        if (!response || !response.candidates || response.candidates.length === 0) {
            return res.status(500).json({ error: "AI response is empty" });
        }

        // ✅ Lấy nội dung text từ response
        const aiContent = response.candidates[0].content.parts.map(p => p.text).join(" ");

        res.json({ result: aiContent });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
