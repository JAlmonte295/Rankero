import React from 'react';
import styles from './CategoryGrid.module.css';

// Helper function to generate a consistent color from a string
const generateColor = (str) => {
  if (!str) return '#555'; // Default color for uncategorized
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 50%, 45%)`;
};

const CategoryGrid = ({ categories, onCategorySelect }) => {
  return (
    <div className={styles.grid}>
      {categories.map(category => (
        <div key={category} className={styles.categoryCard} style={{ borderBottomColor: generateColor(category) }} onClick={() => onCategorySelect(category)}>
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;