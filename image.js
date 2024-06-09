// Define paths to SVG folders and the number of SVG files in each folder
const aboutPath = "./svg/about";
const accommodationPath = "./svg/Accommodation";
const budgetPath = "./svg/Budget";
const daysPath = "./svg/days";
const transportationPath = "./svg/Transportation";

const aboutCount = 14;
const accommodationCount = 6;
const budgetCount = 10;
const daysCount = 74;
const transportationCount = 15;

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Function to generate a random SVG path from a specified folder
function getRandomSvgPath(folderPath, count) {
  const randomNumber = getRandomInt(1, count + 1);
  return `${folderPath}/${randomNumber}.svg`;
}

// Function to generate and store SVG paths in localStorage
export function generateAndStoreSvgPaths() {
  // Retrieve the duration of the trip from localStorage or default to 1
  const duration = parseInt(localStorage.getItem('days'), 10) || 1;

  console.log('Duration:', duration); // Debug: Check the duration value

  // Generate random SVG paths for each category
  const aboutSvg = getRandomSvgPath(aboutPath, aboutCount);
  const accommodationSvg = getRandomSvgPath(accommodationPath, accommodationCount);
  const budgetSvg = getRandomSvgPath(budgetPath, budgetCount);
  const transportationSvg = getRandomSvgPath(transportationPath, transportationCount);

  // Generate random SVG paths for each day of the trip
  const daysSvgs = [];
  for (let i = 0; i < duration; i++) {
    daysSvgs.push(getRandomSvgPath(daysPath, daysCount));
  }
  
  console.log('Days SVGs:', daysSvgs); // Debug: Check the generated SVG paths

  // Store generated SVG paths in localStorage
  localStorage.setItem('aboutSvg', aboutSvg);
  localStorage.setItem('accommodationSvg', accommodationSvg);
  localStorage.setItem('budgetSvg', budgetSvg);
  localStorage.setItem('transportationSvg', transportationSvg);
  localStorage.setItem('daysSvgs', JSON.stringify(daysSvgs));

  // Return the generated SVG paths
  return {
    aboutSvg,
    accommodationSvg,
    budgetSvg,
    transportationSvg,
    daysSvgs
  };
}
