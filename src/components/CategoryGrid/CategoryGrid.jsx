import React from 'react';
import styles from './CategoryGrid.module.css';

// Helper function to generate a consistent color from a string
const getCategoryColor = (category) => {
  if (!category) {
    return '#555'; // Default color for uncategorized
  }
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 50%, 45%)`;
};

const CategoryGrid = ({ categories, onCategorySelect }) => {
  return (
    <div className={styles.categoryGrid}>
      {categories.map((category) => (
        <div
          key={category}
          className={styles.categoryCard}
          style={{ backgroundColor: getCategoryColor(category) }}
          onClick={() => onCategorySelect(category)}
        >
          <h3 className={styles.categoryName}>{category}</h3>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;