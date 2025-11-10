import { useState, useContext } from 'react';
import { Link, useMatch } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

import styles from './RankList.module.css';


const RankList = ({ ranks }) => {
  const { user } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ranksPerPage = 10;

  const isMyRanksPage = useMatch('/:userId/ranks');

  let ranksToDisplay = ranks;

  if (isMyRanksPage && user) {
    ranksToDisplay = ranks.filter((rank) => rank.author._id === user._id);
  }

  const filteredRanks = ranksToDisplay.filter(
    (rank) =>
      rank.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rank.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRank = currentPage * ranksPerPage;
  const indexOfFirstRank = indexOfLastRank - ranksPerPage;
  const currentRanks = filteredRanks.slice(
    indexOfFirstRank,
    indexOfLastRank
  );

  return (
    <main className={styles.container}>
      <h1>{isMyRanksPage ? 'My Ranks' : 'Newest Ranks'}</h1>
      <input
        type='text'
        placeholder='Search by title or category...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {currentRanks.map((rank) => (
        <article key={rank._id}>
          <Link to={`/ranks/${rank._id}`}>
            <h2>{rank.title}</h2>
          </Link>
          <p>Category: {rank.category}</p>
          <p>By: {rank.author.username}</p>
        </article>
      ))}
      <div>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastRank >= filteredRanks.length}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default RankList;