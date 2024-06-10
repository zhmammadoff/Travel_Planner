import { parseAndStoreTravelGuide } from './variables.js';
import generateTravelGuide from './genai.js'; // Importing generateTravelGuide function from genai.js
import { generateAndStoreSvgPaths } from './image.js'; // Import the function from image.js


// Ensure the script runs after the HTML document has been completely loaded and parsed
document.addEventListener('DOMContentLoaded', function() {
    // Get the input element for the number of days
    const daysInput = document.getElementById('days');

    // Add event listener to 'days' input to restrict values between 1 and 7
    daysInput.addEventListener('input', () => {
        let value = parseInt(daysInput.value, 10);

        // Ensure the value is between 1 and 7
        if (isNaN(value) || value < 1) {
            daysInput.value = 1;
        } else if (value > 7) {
            daysInput.value = 7;
        }
    });

    // Get the search form element
    const searchForm = document.getElementById('search-form');

    // Helper function to capitalize the first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    // Check if the search form exists before adding the event listener
    if (searchForm) {
        // Add event listener to the search form
        searchForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent the default form submission behavior

            // Get the destination input and number of days
            const destinationInput = document.getElementById('destination');
            const days = parseInt(daysInput.value, 10);

            // Check if the destination input is empty and show an alert if it is
            if (destinationInput.value.trim() === '') {
                alert('Please enter a destination.');
                return;
            }

            // Format the destination with the first letter uppercase and the rest lowercase
            const formattedDestination = capitalizeFirstLetter(destinationInput.value);

            // Clear local storage before generating new content
            localStorage.clear();

            // Store data in localStorage
            localStorage.setItem('destination', formattedDestination);
            localStorage.setItem('days', days);

            console.log('Destination and days saved to localStorage');

            // Generate and store SVG paths in local storage
            const svgPaths = generateAndStoreSvgPaths();
            console.log('SVG paths generated and stored:', svgPaths);

            // Await the travel guide generation
            try {
                await generateTravelGuide(formattedDestination, days);
                console.log('Travel guide generated successfully');

                // Parse and store the generated travel guide
                const generatedTravelGuide = localStorage.getItem('generatedTravelGuide');
                if (generatedTravelGuide) {
                    parseAndStoreTravelGuide(generatedTravelGuide);
                    console.log('Travel guide parsed and stored successfully.');
                } else {
                    console.error('No generated travel guide found in local storage.');
                }

                // Redirect to the about page
                window.location.href = './about.html';
            } catch (error) {
                console.error('Error generating travel guide:', error);
                alert('There was an error generating the travel guide. Please try again.');
            }
        });
    } else {
        console.error("Element with ID 'search-form' not found in the document.");
    }
});
