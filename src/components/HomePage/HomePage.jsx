import React, { useState, useMemo, useEffect } from 'react';
import RankList from '../RankList/RankList';
import { Link } from 'react-router-dom';
import PageHeader from '../PageHeader/PageHeader';
import CategoryGrid from '../CategoryGrid/CategoryGrid';
import styles from './HomePage.module.css';

const HomePage = ({ ranks }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // This will be debounced
  
  useEffect(() => {
    document.title = 'Explore Ranks';
  }, []);

  // Debounce effect to delay searching
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, ranks]); // Re-run if inputValue or ranks change

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

  const handleSearchChange = (e) => setInputValue(e.target.value);

  if (selectedCategory) {
    return (
      // Pass a function to allow RankList to reset the view
      <RankList ranks={filteredRanks} onBack={() => setSelectedCategory(null)} />
    );
  }
  
  if (searchTerm) {
    return (
      <RankList ranks={ranks} initialSearchTerm={searchTerm} onBack={() => {
        setInputValue('');
        setSearchTerm('');
      }} />
    );
  }

  return (
    <div className={styles.homePage}>
      <PageHeader title="Explore Ranks" />
      <div className={styles.header}>
        <input
          type="text"
          placeholder="Search all ranks..."
          className={styles.searchBar}
          value={inputValue}
          onChange={handleSearchChange}
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