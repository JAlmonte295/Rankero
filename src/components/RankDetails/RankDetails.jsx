import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as rankService from '../../services/rankService';
import { UserContext } from '../../contexts/UserContext';
import CommentForm from '../CommentForm/CommentForm';


const RankDetails = (props) => {
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

  const handleAddComment = async (commentData) => {
    const updatedRank = await rankService.addComment(rankId, commentData);
    setRank(updatedRank);
  };

  const handleDeleteComment = async (rankId, commentId) => {
    await rankService.deleteComment(rankId, commentId);
    const rankData = await rankService.show(rankId);
    setRank(rankData);
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
        {rank.author._id === user._id && (
          <>
          <Link to={`/ranks/${rankId}/edit`}>Edit</Link>
          <button onClick={() => props.handleDeleteRank(rankId)}>
            Delete
            </button>
          </>
        )}
        
        <section>
          <button onClick={handleUpvote} disabled={(rank.upvotes || []).includes(user._id)}>👍</button>
          <span>{(rank.upvotes || []).length}</span>
          <button onClick={handleDownvote} disabled={(rank.downvotes || []).includes(user._id)}>👎</button>
          <span>{(rank.downvotes || []).length}</span>
        </section>
        <section>
        
        <h2>Comments</h2>
        {user && <CommentForm handleAddComment={handleAddComment} />}
        {!(rank.comments || []).length && <p>No comments yet</p>}
        {(rank.comments || []).map((comment) => (
          <article key={comment._id}>
            <header>
              <h3>{comment.author.username}</h3>
              <p>{comment.createdAt}</p>
              {comment.author._id === user._id && (
                <>
                <Link to={`/ranks/${rankId}/comments/${comment._id}/edit`}>Edit</Link>
                <button onClick={() => handleDeleteComment(rankId, comment._id)}>
                  Delete
                </button>
                </>
              )};
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
