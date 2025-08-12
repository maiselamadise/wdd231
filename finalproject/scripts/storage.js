// Save data (any JSON-serializable) to localStorage under the specified key
export function saveToStorage(key, data) {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
    } catch (error) {
      console.error(`Error saving data to localStorage key "${key}":`, error);
    }
  }
  
  // Load data from localStorage key, return defaultValue if not found or error
  export function loadFromStorage(key, defaultValue = null) {
    try {
      const jsonData = localStorage.getItem(key);
      if (!jsonData) return defaultValue;
      return JSON.parse(jsonData);
    } catch (error) {
      console.error(`Error loading data from localStorage key "${key}":`, error);
      return defaultValue;
    }
  }
  
  // Remove data from localStorage by key
  export function removeFromStorage(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }
  