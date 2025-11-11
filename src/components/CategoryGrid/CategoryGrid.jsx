import React from 'react';
import styles from './CategoryGrid.module.css';
import { getCategoryColor } from '../../utils/colorUtils';

const CategoryGrid = ({ categories, onCategorySelect }) => {
  return (
    <div className={styles.grid}>
      {categories.map(category => (
        <div key={category} className={styles.categoryCard} style={{ borderBottomColor: getCategoryColor(category) }} onClick={() => onCategorySelect(category)}>
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;