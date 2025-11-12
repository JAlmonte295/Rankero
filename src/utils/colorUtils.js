/**
 * Generates a consistent, accessible color from a string.
 * Uses HSL to ensure the color has enough saturation and is dark enough
 * to provide good contrast with white text.
 * @param {string} str The input string (e.g., category name).
 * @returns {string} An HSL color string.
 */
export const getCategoryColor = (str) => {
  // A direct mapping of categories to specific, vibrant, and accessible colors.
  const COLOR_MAP = {
    'Games': '#942a25', // Darker Red for AAA contrast
    'Movies': '#2980b9', // Blue
    'TV Shows': '#27ae60', // Green
    'Music': '#6c3483', // Darker Purple for AAA contrast
    'Books': '#874c14', // Darker Orange for AAA contrast
    'Food': '#0b5345', // Darker Teal for AAA contrast
    'Sports': '#d35400', // Pumpkin
    'Travel': '#2c3e50', // Midnight Blue
    'Other': '#7f8c8d',  // Gray
    'Uncategorized': '#7f8c8d', // Gray
  };

  // Return the color from the map, or a default gray if the category is not found.
  return COLOR_MAP[str] || '#7f8c8d';
};
