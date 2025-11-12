import React, { useState, useMemo, useEffect } from 'react';
import RankList from '../RankList/RankList';
import { Link } from 'react-router-dom';
import PageHeader from '../PageHeader/PageHeader';
import CategoryGrid from '../CategoryGrid/CategoryGrid';
import styles from './HomePage.module.css';
import landingStyles from '../Landing/Landing.module.css'; // Import styles from Landing page
import { getCategoryColor } from '../../utils/colorUtils';

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

  // Showcase top 3 ranks by score and creation date
  const trendingRanks = ranks ? [...ranks].sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 3) : [];
  const newestRanks = ranks ? [...ranks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3) : [];

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

      {trendingRanks.length > 0 && (
        <section className={landingStyles.showcase}>
          <h2>🔥 Trending Ranks</h2>
          <div className={landingStyles.ranksContainer}>
            {trendingRanks.map((rank) => (
              <Link to={`/ranks/${rank._id}`} key={rank._id} className={landingStyles.rankCard}>
                <span className={landingStyles.rankCategory} style={{ backgroundColor: getCategoryColor(rank.category) }}>{rank.category}</span>
                <h3 className={landingStyles.rankTitle}>{rank.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {newestRanks.length > 0 && (
        <section className={landingStyles.showcase}>
          <h2>✨ Newest Ranks</h2>
          <div className={landingStyles.ranksContainer}>
            {newestRanks.map((rank) => (
              <Link to={`/ranks/${rank._id}`} key={rank._id} className={landingStyles.rankCard}>
                <span className={landingStyles.rankCategory} style={{ backgroundColor: getCategoryColor(rank.category) }}>{rank.category}</span>
                <h3 className={landingStyles.rankTitle}>{rank.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className={styles.actionsContainer}>
        <p>Or, if you have an idea for a list, create your own!</p>
        <Link to="/ranks/new" className={styles.createRankButton}>Create New Rank</Link>
      </div>
    </div>
  );
};

export default HomePage;