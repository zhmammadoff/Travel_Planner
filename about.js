document.addEventListener('DOMContentLoaded', () => {
    try {
        // Retrieve variables from localStorage
        const headerAboutCity = localStorage.getItem('header_about_city');
        const descriptionAboutCity = localStorage.getItem('description_about_city');
        const aboutSvg = localStorage.getItem('aboutSvg');

        // Log the retrieved values for debugging purposes
        console.log('headerAboutCity:', headerAboutCity);
        console.log('descriptionAboutCity:', descriptionAboutCity);
        console.log('aboutSvg:', aboutSvg);

        // Display the retrieved values in the corresponding elements (with element existence checks)
        displayElementContent('aboutHeaderElement', headerAboutCity);
        displayElementContent('aboutDescription', descriptionAboutCity);
        displaySvg('aboutSvgElement', aboutSvg);

    } catch (error) {
        // Log any errors and alert the user
        console.error('Error displaying travel guide content:', error);
        alert('An error occurred while loading the travel guide. Please try again later.');
    }

    // Add click event listener to the forward button for navigation
    const forwardButton = document.getElementById('forwardButton');
    if (forwardButton) {
        forwardButton.addEventListener('click', () => {
            window.location.href = 'odd_page.html?day=1'; // Navigate to the odd_page.html with query parameter day=1
        });
    } else {
        // Warn if the forward button is not found in the document
        console.warn("Forward button not found. Skipping navigation.");
    }
});

// Function to set content for an element if it exists
function displayElementContent(elementId, content) {
    const element = document.getElementById(elementId);
    if (element) {
        console.log(`Setting content for ${elementId}`);
        element.textContent = content; // Set the text content of the element
    } else {
        // Warn if the element is not found in the document
        console.warn(`Element with ID '${elementId}' not found.`);
    }
}

// Function to set SVG content for an element if it exists
function displaySvg(elementId, svg) {
    const element = document.getElementById(elementId);
    if (element && svg) {
        console.log(`Setting SVG content for ${elementId}`);
        element.src = svg; // Set the SVG source of the element
    } else {
        // Warn if the element is not found in the document or if the SVG source is empty
        console.warn(`Element with ID '${elementId}' not found or SVG source is empty.`);
    }
}
