import axios from "axios";

const API_KEY = "AIzaSyBkCzEkB6y5tnbkljMNHq29w88DTt3X6Js";

export const generateQuestions = async (role) => {

  try {

    const prompt = `
Generate 10 realistic interview questions for a ${role} role.

Rules:
1. First question must be "Tell me about yourself."
2. Questions must be role specific.
3. Questions must be different and realistic.
4. Include technical and HR questions.

Return ONLY a JSON array.

Example:
[
 "Tell me about yourself.",
 "Explain React Hooks.",
 "What is JWT?"
]
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }
    );

    console.log("FULL GEMINI RESPONSE:", response.data);

    const text =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    console.log("RAW TEXT:", text);

    if (!text) {
      throw new Error("No questions generated");
    }

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const questions = JSON.parse(cleanedText);

    return questions;

  } catch (error) {

    console.log("GEMINI ERROR:", error);

    return [
      "Tell me about yourself.",
      "What are your strengths?",
      "Explain your latest project.",
      "Why should we hire you?",
      "Where do you see yourself in 5 years?"
    ];
  }
};