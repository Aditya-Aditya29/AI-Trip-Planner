const axios = require('axios');
require('dotenv').config();

async function searchWithLLMs(prompt){
    const [openai, deepseek, gemini] = await Promise.all([
        queryOpenAI(prompt),
        queryDeepseek(prompt),   // replaced queryClaude with queryDeepseek
        queryGemini(prompt)
    ]);

    return {
        optionA: `${openai}`,
        optionB: `${deepseek}`,
        optionC: `${gemini}`
    };
}

async function queryOpenAI(prompt) {
    try {
        const res = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7
        }, {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });
        return res.data.choices[0].message.content.trim();
    } catch (err) {
        return `Error: ${err.message}`;
    }
}

// Deepseek API call
async function queryDeepseek(prompt) {
    try {
        const res = await axios.post('https://api.deepseek.com/v1/chat/completions', {
            model: 'deepseek-chat',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7
        }, {
            headers: {
                Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`
            }
        });
        // Adjust if response shape is different
        return res.data.choices[0].message.content.trim();
    } catch (err) {
        return `Error: ${err.message}`;
    }
}

async function queryGemini(prompt) {
    try {
        const res = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return res.data.candidates[0].content.parts[0].text.trim();
    } catch (err) {
        return `Error: ${err.message}`;
    }
}

module.exports = { searchWithLLMs };
