/**
 * Generates a consistent, accessible color from a string.
 * Uses HSL to ensure the color has enough saturation and is dark enough
 * to provide good contrast with white text.
 * @param {string} str The input string (e.g., category name).
 * @returns {string} An HSL color string.
 */
export const getCategoryColor = (str) => {
  if (!str) return 'hsl(0, 0%, 33%)'; // A neutral gray for uncategorized items
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  // Using 70% saturation and 35% lightness provides even better contrast
  return `hsl(${h}, 70%, 35%)`;
};
