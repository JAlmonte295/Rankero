import React, { useState, useMemo } from 'react';
import RankList from '../RankList/RankList';
import { Link } from 'react-router-dom';
import CategoryGrid from '../CategoryGrid/CategoryGrid';
import styles from './HomePage.module.css';

const HomePage = ({ ranks }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Memoize the extraction of unique categories to avoid recalculating on every render
  const categories = useMemo(() => {
    const categorySet = new Set(ranks.map(rank => rank.category || 'Uncategorized'));
    return Array.from(categorySet);
  }, [ranks]);

  // Memoize the filtered ranks to show when a category is selected
  const filteredRanks = useMemo(() => {
    if (!selectedCategory) {
      return [];
    }
    return ranks.filter(rank => (rank.category || 'Uncategorized') === selectedCategory);
  }, [ranks, selectedCategory]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      setSearchTerm(e.target.value);
    }
  };

  if (selectedCategory) {
    return (
      // Pass a function to allow RankList to reset the view
      <RankList ranks={filteredRanks} onBack={() => setSelectedCategory(null)} />
    );
  }
  
  if (searchTerm) {
    return (
      <RankList ranks={ranks} initialSearchTerm={searchTerm} onBack={() => setSearchTerm('')} />
    );
  }

  return (
    <div className={styles.homePage}>
      <div className={styles.header}>
        <h2>Explore Categories or Search Directly</h2>
        <input
          type="text"
          placeholder="Search all ranks..."
          className={styles.searchBar}
          onKeyDown={handleSearch}
        />
      </div>
      <CategoryGrid categories={categories} onCategorySelect={setSelectedCategory} />
      <div className={styles.actionsContainer}>
        <p>Or, if you have an idea for a list, create your own!</p>
        <Link to="/ranks/new" className={styles.createRankButton}>Create New Rank</Link>
      </div>
    </div>
  );
};

export default HomePage;