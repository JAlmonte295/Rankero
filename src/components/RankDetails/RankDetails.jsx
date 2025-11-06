import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as rankService from '../../services/rankService';

const RankDetails = () => {
  const { rankId } = useParams();
  const [rank, setRank] = useState(null);

  useEffect(() => {
    const fetchRank = async () => {
      const rankData = await rankService.show(rankId);
      setRank(rankData);
    };
    fetchRank();
  }, [rankId]);

  if (!rank) return <main>Loading...</main>;

  return (
    <main>
      <article>
        <header>
          <h2>{rank.category}</h2>
          <h1>{rank.title}</h1>
          <p>{rank.description}</p>
          <p>By {rank.author.username}</p>
        </header>
        <ul>
          {rank.list.map((item) => (
            <li key={item._id}>{item.itemName}</li>
          ))}
        </ul>
      </article>
    </main>
  );
};

export default RankDetails;
