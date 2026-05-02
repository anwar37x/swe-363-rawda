// backend/controllers/chatController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are a friendly and knowledgeable plant care assistant for Rawda, a gardening app.
Your job is to help home gardeners with plant care questions.
Keep your answers helpful, friendly, and practical.
Focus specifically on plant care topics: watering, lighting, soil, pests, propagation, fertilizing, and general plant health.
If asked about something unrelated to plants or gardening, kindly redirect the conversation back to plant care.
Keep responses concise — 2-4 sentences is usually enough unless the question requires more detail.`;

exports.chat = async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ message: "Messages array is required" });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: SYSTEM_PROMPT,
        });

        // Convert messages to Gemini format
        // Gemini uses "user" and "model" roles (not "assistant")
        const history = messages.slice(0, -1).map((m) => ({
            role:  m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }],
        }));

        // Last message is the current user input
        const lastMessage = messages[messages.length - 1];

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(lastMessage.content);
        const text   = result.response.text();

        res.json({ reply: text });

    } catch (error) {
        console.error("Chat error:", error.message);
        res.status(500).json({ message: "Chatbot temporarily unavailable." });
    }
};