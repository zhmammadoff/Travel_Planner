document.addEventListener('DOMContentLoaded', function() {
  // Set the content of the header_additional_tips element from localStorage
  document.getElementById('header_additional_tips').textContent = localStorage.getItem('header_additional_tips');

  // Set the content of the accommodation_tips element from localStorage
  document.getElementById('accommodation_tips').textContent = 'Accommodation: ' + localStorage.getItem('accommodation_tips');

  // Set the content of the transportation_tips element from localStorage
  document.getElementById('transportation_tips').textContent = 'Transportation: ' + localStorage.getItem('transportation_tips');

  // Set the content of the budget_tips element from localStorage
  document.getElementById('budget_tips').textContent = 'Budget: ' + localStorage.getItem('budget_tips');

  // Set the images for the frames from localStorage
  document.getElementById('accommodation_image').src = localStorage.getItem('accommodationSvg');
  document.getElementById('transportation_image').src = localStorage.getItem('transportationSvg');
  document.getElementById('budget_image').src = localStorage.getItem('budgetSvg');

  // Add event listener to the previousButton
  document.getElementById('previousButton').addEventListener('click', function() {
    // Get the number of days from localStorage and parse it to an integer
    const days = parseInt(localStorage.getItem('days'), 10);

    // Redirect to either even_page.html or odd_page.html based on whether the number of days is even or odd
    window.location.href = days % 2 === 0 ? `even_page.html?day=${days}` : `odd_page.html?day=${days}`;
  });
});
