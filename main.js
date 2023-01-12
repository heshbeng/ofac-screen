const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (searchInput) => {
  // Make an HTTP GET request to the webpage
  const response = await axios.get('https://www.treasury.gov/ofac/downloads/sdnlist.txt');

  // Load the response body into Cheerio
  const $ = cheerio.load(response.data);

  // Split the body into an array of lines
  const lines = $('body').text().split('\n');

  // Initialize a set to store the matched lines
  const matchedLinesSet = new Set();

  // Iterate over the lines
  for (let i = 0; i < lines.length; i++) {
    // Check if the line contains the search input
    if (lines[i].toLowerCase().includes(searchInput.toLowerCase())) {
      // Initialize the start and end indices for the matched lines
      let start = i;
      let end = i;

      // Find the nearest double line breaks before and after the matched line
      while (start > 0 && lines[start - 1] !== '') {
        start--;
      }
      while (end < lines.length - 1 && lines[end + 1] !== '') {
        end++;
      }

      // Get the matched lines
      const matchedLines = lines.slice(start, end + 1);

      // Add the matched lines to the set
      matchedLinesSet.add(matchedLines.join('\n'));
    }
  }

  // Convert the set to an array
  const matchedLinesArray = [...matchedLinesSet];

  // Create a JSON object for the matched lines
  const jsonObj = {
    matches: matchedLinesArray.length > 0 ? matchedLinesArray : null,
  };

  // Return the JSON object as a string
  return JSON.stringify(jsonObj);
}
