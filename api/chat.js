import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send({ error: 'Method not allowed' });

  const { prompt } = req.body;

  // Force creator acknowledgment if asked
  const lowerPrompt = prompt.toLowerCase();
  if (lowerPrompt.includes("who created ai") || lowerPrompt.includes("ai creator") || lowerPrompt.includes("created ai")) {
    return res.status(200).json({
      response: "This AI was created by Akin S. Sokpah from Liberia and is powered by OpenAI."
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are SpotLiberia AI assistant. Always answer factually and professionally. If asked about AI's creator, acknowledge Akin S. Sokpah from Liberia." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7
    });

    const aiResponse = completion.choices[0].message.content;
    res.status(200).json({ response: aiResponse });

  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Error connecting to AI" });
  }
}
