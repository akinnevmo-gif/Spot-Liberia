import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send({ error: 'Method not allowed' });

  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const aiResponse = completion.choices[0].message.content;
    res.status(200).json({ response: aiResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Error connecting to AI" });
  }
}
