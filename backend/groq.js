import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing in backend/.env");
}

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY.trim(),
});

const groqResponse = async (command, assistantName, userName) => {
    try {
        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",

            messages: [
                {
                    role: "system",
                    content: `
You are ${assistantName}, a personal AI virtual assistant for ${userName}.

Your task is to understand the user's command and return ONLY valid JSON.

Do not add markdown.
Do not add explanations outside JSON.

Return JSON in exactly this format:

{
  "type": "command_type",
  "userInput": "original user command",
  "response": "response or useful information"
}

Allowed command types:

get_date
get_time
get_day
get_month
google_search
youtube_search
youtube_play
general
calculator_open
facebook_open
instagram_open
weather-show

Rules:

1. If the user asks for the current date:
   type = "get_date"

2. If the user asks for the current time:
   type = "get_time"

3. If the user asks which day it is:
   type = "get_day"

4. If the user asks for the current month:
   type = "get_month"

5. If the user wants to search Google:
   type = "google_search"

6. If the user wants to search YouTube:
   type = "youtube_search"

7. If the user wants to play something on YouTube:
   type = "youtube_play"

8. If the user asks to open calculator:
   type = "calculator_open"

9. If the user asks to open Facebook:
   type = "facebook_open"

10. If the user asks to open Instagram:
    type = "instagram_open"

11. If the user asks about weather:
    type = "weather-show"

12. For normal questions and conversations:
    type = "general"

For search/play commands, put the useful search query in "response".

For general questions, put the assistant's answer in "response".

Return JSON only.
                    `,
                },
                {
                    role: "user",
                    content: command,
                },
            ],

            temperature: 0.2,
            max_completion_tokens: 1024,

            response_format: {
                type: "json_object",
            },
        });

        return completion.choices[0]?.message?.content || "{}";

    } catch (error) {
        console.error(
            "Groq API Error:",
            error.response?.data || error.message
        );

        throw error;
    }
};

export default groqResponse;