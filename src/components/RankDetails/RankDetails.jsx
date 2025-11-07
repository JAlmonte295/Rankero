import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as rankService from '../../services/rankService';
import { UserContext } from '../../contexts/UserContext';

const RankDetails = () => {
  const { user } = useContext(UserContext);
  const { rankId } = useParams();
  const [rank, setRank] = useState(null);

  useEffect(() => {
    const fetchRank = async () => {
      const rankData = await rankService.show(rankId);
      setRank(rankData);
    };
    fetchRank();
  }, [rankId]);

  const handleUpvote = async () => {
    const updatedRank = await rankService.upvote(rankId);
    setRank(updatedRank);
  };

  const handleDownvote = async () => {
    const updatedRank = await rankService.downvote(rankId);
    setRank(updatedRank);
  };

  if (!rank) return <main>Loading...</main>;

  return (
    <main>
      <article>
        <header>
          <h2>{rank.category}</h2>
          <h1>{rank.title}</h1>
          {rank.description && <p>{rank.description}</p>}
          {rank.author && <p>By {rank.author.username}</p>}
        </header>
        <ol>
          {rank.list.map((item) => (
            <li key={item._id}>{item.itemName}</li>
          ))}
        </ol>
        <section>
          <button onClick={handleUpvote} disabled={(rank.upvotes || []).includes(user._id)}>👍</button>
          <span>{(rank.upvotes || []).length}</span>
          <button onClick={handleDownvote} disabled={(rank.downvotes || []).includes(user._id)}>👎</button>
          <span>{(rank.downvotes || []).length}</span>
        </section>
        <section>
        <h2>Comments</h2>
        {!(rank.comments || []).length && <p>No comments yet</p>}
        {(rank.comments || []).map((comment) => (
          <article key={comment._id}>
            <header>
              <h3>{comment.author.username}</h3>
              <p>{comment.createdAt}</p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
        </section>
      </article>
    </main>
  );
};

export default RankDetails;
