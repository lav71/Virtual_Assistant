import axios from "axios";

const geminiResponse = async (command, assistantName, userName) => {
  const prompt = `
You are a virtual assistant named ${assistantName} created by ${userName}.
You are a voice-enabled virtual assistant.

Understand the user's natural language input and return ONLY a JSON object.

The JSON format must be:

{
  "type": "general" | "google_search" | "youtube_search" | "youtube_play" | "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "facebook_open" | "weather-show",
  "userInput": "<original user input>",
  "response": "<short spoken response>"
}

Type meanings:

- "general": normal factual or informational question
- "google_search": user wants to search Google
- "youtube_search": user wants to search YouTube
- "youtube_play": user wants to play a video or song on YouTube
- "calculator_open": user wants to open calculator
- "instagram_open": user wants to open Instagram
- "facebook_open": user wants to open Facebook
- "weather-show": user wants weather information
- "get_time": user asks current time
- "get_date": user asks today's date
- "get_day": user asks today's day
- "get_month": user asks current month

If the user asks who created you, say that ${userName} created you.

Return ONLY valid JSON.
Do not use markdown.
Do not add any explanation.

User input:
${command}
`;

  try {
    const result = await axios.post(
      process.env.GEMINI_API_URL,
      {
        model: "gemini-3.8-flash",
        input: prompt,
      },
      {
        headers: {
          "x-goog-api-key": process.env.GEMINI_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "Gemini API Response:",
      JSON.stringify(result.data, null, 2)
    );

    const text =
      result.data?.steps
        ?.find((step) => step.type === "model_output")
        ?.content
        ?.find((content) => content.type === "text")
        ?.text;

    if (!text) {
      throw new Error("Gemini returned empty response");
    }

    return text;

  } catch (error) {
    console.log(
      "Gemini API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

export default geminiResponse;