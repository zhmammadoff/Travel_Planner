import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";
// Replace 'YOUR_API_KEY' with your actual API key
const API_KEY = 'AIzaSyBt90HRyaoFvcUJmxscuuNbWUV_nbuw-bU'
const genAI = new GoogleGenerativeAI(API_KEY);

// Check if API_KEY is provided
if (!API_KEY) {
  throw new Error('Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable');
}

// Function to generate a travel guide using Google Generative AI
export default async function generateTravelGuide(city, duration) {
  // Construct prompt with required information
  const prompt = `
    City= ${city} 
    Duration= ${duration} 
    Target Audience= General travelers (mix of interests) 
    Style= Informative and engaging, with historical context and cultural insights 
    Content= 
    Goal= Create a comprehensive and engaging travel itinerary for a specific city, suitable for general travelers with a mix of interests 
    Output Format= Return each content element as its own variable with a descriptive name in JSON format. 
    Variables=
    city= (String) The name of the city 
    duration= (Number) The total duration of the trip (e.g., "3", "7") 
    header_about_city= (String) A captivating header for the "About the City" section 
    description_about_city= (String) 5-6 sentences describing the city's history, culture, and key attractions 
    header_additional_tips= (String) A captivating header for the "Additional Tips" section 
    accommodation_tips= (String) 2-3 sentences explaining accommodation options in the city, considering location factors 
    transportation_tips= (String) 2-3 sentences explaining the public transportation system and suggesting a city pass if available 
    budget_tips= (String) 2-3 sentences giving budgeting tips for accommodation, meals, and activities 
    ${Array.from({ length: duration }, (_, i) => `
      day${i + 1}_title= (String) Title for Day ${i + 1} of the itinerary (e.g., "Day ${i + 1}= Historical Exploration") 
      day${i + 1}_morning_activity= (String) 2-3 sentences suggesting a morning activity with historical significance for Day ${i + 1} 
      day${i + 1}_afternoon_activity= (String) 2-3 sentences recommending an afternoon activity with a contrasting theme (e.g., art, architecture) for Day ${i + 1} 
      day${i + 1}_evening_activity= (String) 2-3 sentences proposing an evening activity highlighting the city's culture (e.g., food, entertainment) for Day ${i + 1}
    `).join('')}
  `;

  try {
    console.log('Generating travel guide...');

    // Get Generative Model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    
    // Generate content based on the prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Clean the response to ensure it is valid JSON
    const cleanedText = text.replace(/```json|```/g, '').trim();
    console.log('Travel guide generated:', cleanedText);

    // Parse the JSON response
    const travelGuide = JSON.parse(cleanedText);

    // Save the generated JSON to local storage
    localStorage.setItem('generatedTravelGuide', JSON.stringify(travelGuide));

    return travelGuide;
  } catch (error) {
    console.error('Error generating travel guide:', error);
    throw error; // Propagate error to be caught in index.js
  }
}
