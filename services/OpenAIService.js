import axios from 'axios';
import { OPENAI_API_KEY } from '@env'; // Correct environment variable import

const OpenAIService = {
  async fetchMotivationalQuote(name, gender, age, occupation, language, style = 'motivational') {
    const prompt = `Generate a ${style} motivational quote for ${name}, a ${age}-year-old ${occupation} who speaks ${language}.`;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // or 'gpt-4' based on your preference
          messages: [
            {
              role: 'system',
              content: 'You are an assistant that generates motivational quotes.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 100,
          temperature: 0.7 // Adjust the temperature for more or less randomness
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`, // Use the correct variable for the API key
            'Content-Type': 'application/json'
          }
        }
      );

      // Check if choices exist before accessing them
      if (response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message.content.trim(); // Trim to remove extra whitespace
      } else {
        console.warn('No choices returned from API.');
        return 'Stay motivated!';
      }
    } catch (error) {
      console.error('Error fetching quote:', error); // Log the error for debugging
      return 'Stay motivated!';
    }
  }
};

export default OpenAIService;
