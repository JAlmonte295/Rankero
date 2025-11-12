/**
 * Generates a consistent, accessible color from a string based on a predefined map.
 * @param {string} str The input string (e.g., category name).
 * @returns {string} A hex color string.
 */
export const getCategoryColor = (str) => {
  const COLOR_MAP = {
    'Games': '#942a25',
    'Movies': '#2980b9',
    'TV Shows': '#27ae60',
    'Music': '#6c3483',
    'Books': '#874c14',
    'Food': '#0b5345',
    'Sports': '#d35400',
    'Travel': '#2c3e50',
    'Other': '#7f8c8d',  
    'Uncategorized': '#7f8c8d', 
  };

  return COLOR_MAP[str] || '#7f8c8d';
};
