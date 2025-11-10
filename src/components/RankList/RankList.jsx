import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './RankList.module.css';

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
  return `hsl(${h}, 70%, 40%)`;
};

const RankList = ({ ranks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredRanks = useMemo(() => {
    return ranks.filter(rank =>
      rank.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rank.category && rank.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [ranks, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRanks = filteredRanks.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredRanks.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className={styles.rankListPage}>
      <div className={styles.controlsContainer}>
        <input
          type="text"
          placeholder="Search ranks by title or category..."
          className={styles.searchBar}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on new search
          }}
        />
      </div>

      <div className={styles.rankGrid}>
        {currentRanks.map((rank) => (
          <div key={rank._id} className={styles.rankCard}>
            <Link to={`/ranks/${rank._id}`} className={styles.rankLink}>
              <span
                className={styles.rankCategory}
                style={{ backgroundColor: getCategoryColor(rank.category) }}
              >
                {rank.category || 'Uncategorized'}
              </span>
              <h3 className={styles.rankTitle}>{rank.title}</h3>
              {rank.choices && rank.choices.length > 0 && (
                <div className={styles.choicePreview}>
                  <h4>Choices Preview:</h4>
                  <ul>
                    {rank.choices.slice(0, 3).map((choice, index) => (
                      <li key={index}>{choice.itemName}</li>
                    ))}
                    {rank.choices.length > 3 && <li className={styles.moreChoices}>...and more</li>}
                  </ul>
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RankList;