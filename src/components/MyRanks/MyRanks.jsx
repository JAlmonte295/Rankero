import React, { useState, useEffect, useContext } from 'react';
import RankList from '../RankList/RankList';
import { UserContext } from '../../contexts/UserContext';

const MyRanks = ({ allRanks }) => {
  const { user } = useContext(UserContext);
  const [myRanks, setMyRanks] = useState([]);

  useEffect(() => {
    if (user && allRanks?.length) {
      // Filter the ranks to only include those created by the current user
      const userRanks = allRanks.filter(rank => rank.author && rank.author._id === user._id);
      setMyRanks(userRanks);
    }
  }, [user, allRanks]);

  if (!user) {
    return <p>Please sign in to see your ranks.</p>;
  }

  return <RankList ranks={myRanks} />;
};

export default MyRanks;