import React from 'react';
import styles from './PageHeader.module.css';
import { getCategoryColor } from '../../utils/colorUtils';

const PageHeader = ({ title, category }) => {
  return (
    <div className={styles.header}>
      {category && (
        <span
          className={styles.categoryTag}
          style={{ backgroundColor: getCategoryColor(category) }}
        >
          {category}
        </span>
      )}
      <h1>{title}</h1>
    </div>
  );
};

export default PageHeader;
