// Fetch JSON data from a URL and return the parsed result
export async function fetchData(url) {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Re-throw to allow caller to handle it
    }
  }
  