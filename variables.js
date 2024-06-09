// Exported function to parse the JSON travel guide and store its contents in localStorage
export function parseAndStoreTravelGuide(text) {
    try {
        // Parse the JSON text into an object
        const travelGuide = JSON.parse(text);

        // Store general information in localStorage
        localStorage.setItem('city', travelGuide.city);
        localStorage.setItem('duration', travelGuide.duration.toString());
        localStorage.setItem('header_about_city', travelGuide.header_about_city);
        localStorage.setItem('description_about_city', travelGuide.description_about_city);
        localStorage.setItem('header_additional_tips', travelGuide.header_additional_tips);
        localStorage.setItem('accommodation_tips', travelGuide.accommodation_tips);
        localStorage.setItem('transportation_tips', travelGuide.transportation_tips);
        localStorage.setItem('budget_tips', travelGuide.budget_tips);

        // Store day-specific information in localStorage
        for (let i = 1; i <= travelGuide.duration; i++) {
            localStorage.setItem(`day${i}_title`, travelGuide[`day${i}_title`]);
            localStorage.setItem(`day${i}_morning_activity`, travelGuide[`day${i}_morning_activity`]);
            localStorage.setItem(`day${i}_afternoon_activity`, travelGuide[`day${i}_afternoon_activity`]);
            localStorage.setItem(`day${i}_evening_activity`, travelGuide[`day${i}_evening_activity`]);
        }
    } catch (error) {
        console.error('Error parsing and storing travel guide:', error);
        throw error; // Propagate error for higher-level handling
    }
}

// Function to extract a specific variable from a JSON object
function extractVariable(json, variable) {
    return json[variable];
}
