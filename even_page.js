document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const day = parseInt(urlParams.get('day'), 10);
    const days = parseInt(localStorage.getItem('days'), 10);
  
    // Ensure the day image element exists before accessing it
    const dayImageElement = document.getElementById('day_image');
    if (!dayImageElement) {
      console.error('Day image element not found');
      return;
    }
  
    document.getElementById('dayHeader').textContent = localStorage.getItem(`day${day}_title`);
    document.getElementById('morningEvent').textContent = localStorage.getItem(`day${day}_morning_activity`);
    document.getElementById('noonEvent').textContent = localStorage.getItem(`day${day}_afternoon_activity`);
    document.getElementById('eveningEvent').textContent = localStorage.getItem(`day${day}_evening_activity`);
  
    const daysSvgs = JSON.parse(localStorage.getItem('daysSvgs')) || [];
    if (daysSvgs[day - 1]) {
      console.log(`Setting image src to: ${daysSvgs[day - 1]}`);
      dayImageElement.src = daysSvgs[day - 1];
    } else {
      console.error(`Image for day ${day} not found in localStorage`);
    }

    // Add event listener to the previousButton for navigation
    document.getElementById('previousButton').addEventListener('click', function() {
        // Redirect to the previous day's page
        window.location.href = `odd_page.html?day=${day - 1}`;
    });

    // Add event listener to the forwardButton for navigation
    document.getElementById('forwardButton').addEventListener('click', function() {
        // Redirect to the end page if it's the last day, otherwise go to the next day's page
        if (day === days) {
            window.location.href = 'end.html';
        } else {
            window.location.href = `odd_page.html?day=${day + 1}`;
        }
    });
});
