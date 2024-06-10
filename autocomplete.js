document.addEventListener('DOMContentLoaded', function() {
    const destinationInput = document.getElementById('destination');
  
    destinationInput.addEventListener('input', function() {
      const query = destinationInput.value;
  
      if (query.length >= 3) { // Fetch suggestions after 3 characters
        fetchCities(query);
      }
    });
  
    async function fetchCities(query) {
      const apiKey = '3b2d4fdb1amsh4e5ac75a1db0e61p11ffa5jsn35e4a4cdf945'; // Replace with your RapidAPI key
      const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`;
  
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
        }
      };
  
      try {
        const response = await fetch(url, options);
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        showSuggestions(data.data);
      } catch (error) {
        console.error('Error fetching city data:', error);
        clearSuggestions();
      }
    }
  
    function showSuggestions(cities) {
      const suggestionBox = document.createElement('div');
      suggestionBox.setAttribute('class', 'suggestion-box');
  
      if (cities && cities.length) {
        cities.forEach(city => {
          const suggestion = document.createElement('div');
          suggestion.setAttribute('class', 'suggestion');
          suggestion.textContent = `${city.name}, ${city.country}`;
          suggestion.addEventListener('click', () => {
            destinationInput.value = suggestion.textContent;
            clearSuggestions();
          });
          suggestionBox.appendChild(suggestion);
        });
      } else {
        const noResults = document.createElement('div');
        noResults.setAttribute('class', 'no-results');
        noResults.textContent = 'No cities found';
        suggestionBox.appendChild(noResults);
      }
  
      clearSuggestions(); // Clear any existing suggestions
      destinationInput.parentNode.appendChild(suggestionBox);
    }
  
    function clearSuggestions() {
      const existingSuggestions = document.querySelector('.suggestion-box');
      if (existingSuggestions) {
        existingSuggestions.remove();
      }
    }
  
    document.addEventListener('click', function(event) {
      if (!event.target.classList.contains('suggestion')) {
        clearSuggestions();
      }
    });
  });
  