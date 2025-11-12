import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import RankList from '../RankList/RankList';
import PageHeader from '../PageHeader/PageHeader';
import { UserContext } from '../../contexts/UserContext';
import styles from './MyRanks.module.css';
import homePageStyles from '../HomePage/HomePage.module.css'; // Import styles from HomePage

const MyRanks = ({ allRanks }) => {
  const { user } = useContext(UserContext);
  const [myRanks, setMyRanks] = useState([]);

  const pageTitle = user ? `${user.username}'s Ranks` : 'My Ranks';

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
    if (user && allRanks?.length) {
      // Filter the ranks to only include those created by the current user
      const userRanks = allRanks.filter(rank => rank.author && rank.author._id === user._id);
      setMyRanks(userRanks);
    } else if (user) {
      setMyRanks([]);
    }
  }, [user, allRanks]);

  if (!user) {
    return <p>Please sign in to see your ranks.</p>;
  }

  if (myRanks.length === 0) {
    return (
      <div className={styles.welcomeContainer}>
        <PageHeader title={pageTitle} />
        <p>It looks like you haven't created any rank lists yet. Get started by creating your first one!</p>
        <p>You can also visit the Explore Ranks page to see what others have created.</p>
        <Link to="/ranks/new" className={homePageStyles.createRankButton}>Create Your First Rank</Link>
      </div>
    );
  }

  return (
    <>
      <PageHeader title={pageTitle} />
      <RankList ranks={myRanks} />
      <div className={homePageStyles.actionsContainer}>
        <p>Ready to create another list?</p>
        <Link to="/ranks/new" className={homePageStyles.createRankButton}>Create New Rank</Link>
      </div>
    </>
  );
};

export default MyRanks;