import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as rankService from '../../services/rankService';
import PageHeader from '../PageHeader/PageHeader';
import { UserContext } from '../../contexts/UserContext';
import styles from './RankDetails.module.css';
import CommentForm from '../CommentForm/CommentForm';
import upvoteImage from '../../assets/images/thumbsUp.png';
import downvoteImage from '../../assets/images/thumbsDown.png';

const RankDetails = ({ handleDeleteRank, handleUpdateComment }) => {
    const { rankId } = useParams();
    const { user } = useContext(UserContext);
    const [rank, setRank] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (rank) {
            document.title = rank.title;
        }
    }, [rank]);

    useEffect(() => {
        const fetchRank = async () => {
            try {
                const rankData = await rankService.show(rankId);
                setRank(rankData);
            } catch (error) {
                console.error("Failed to fetch rank:", error);
                // Optionally navigate to a not-found page
                // navigate('/not-found');
            }
        };
        fetchRank();
    }, [rankId]);

    const handleVote = async (choiceId, vote) => {
        if (!user) {
            navigate('/sign-in');
            return;
        }
        try {
            const updatedRank = await rankService.voteOnChoice(rankId, choiceId, vote);
            setRank(updatedRank);
        } catch (error) {
            console.error("Failed to vote:", error);
        }
    };

    const handleAddComment = async (commentFormData) => {
        if (!user) {
            navigate('/sign-in');
            return;
        }
        try {
            const updatedRank = await rankService.addComment(rankId, commentFormData);
            setRank(updatedRank);
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const updatedRank = await rankService.deleteComment(rankId, commentId);
            setRank(updatedRank);
        } catch (error) {
            console.error("Failed to delete comment:", error);
        }
    };

    const handleRankVote = async (voteType) => {
        if (!user) {
            navigate('/sign-in');
            return;
        }
        try {
            let updatedRank;
            if (voteType === 'up') {
                updatedRank = await rankService.upvote(rankId);
            } else {
                updatedRank = await rankService.downvote(rankId);
            }
            setRank(updatedRank);
        } catch (error) {
            console.error(`Failed to ${voteType} rank:`, error);
        }
    };

    const isAuthor = user && rank && user._id === rank.author?._id;

    const handleBack = () => {
        // If the user is the author, go to My Ranks, otherwise go back in history
        isAuthor ? navigate('/my-ranks') : navigate(-1);
    };

    if (!rank) {
        return <main className={styles.loading}>Loading...</main>;
    }

    return (
        <main className={styles.container}>
            <button onClick={handleBack} className={styles.backButton}>
                &larr; Back
            </button>
            <PageHeader title={rank.title} />
            <div className={styles.rankMeta}>                <p className={styles.description}>{rank.description}</p>
                <p className={styles.author}>
                    Created by: <span>{rank.author?.username || 'Unknown'}</span>
                </p>
                <div className={styles.rankVotingContainer}>
                    <button onClick={() => handleRankVote('up')} className={styles.rankVoteButton}><img src={upvoteImage} alt="Upvote" /></button>
                    <span className={styles.rankScore}>{rank.score || 0}</span>
                    <button onClick={() => handleRankVote('down')} className={styles.rankVoteButton}><img src={downvoteImage} alt="Downvote" /></button>
                </div>
            </div>

            <div className={styles.listContainer}>
                <div className={styles.listHeader}>
                    <h2>The List</h2>
                    {isAuthor && (
                        <div className={styles.authorActions}>
                            <Link to={`/ranks/${rank._id}/edit`} className={styles.editButton}>Edit</Link>
                            <button onClick={() => handleDeleteRank(rank._id)} className={styles.deleteButton}>Delete</button>
                        </div>
                    )}
                </div>
                {rank.list?.map((choice, index) => (
                    <div
                        key={choice._id || index}
                        className={styles.choiceBanner}
                        style={{ backgroundImage: choice.imageUrl ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${choice.imageUrl})` : '' }}
                    >
                        <span className={styles.rankPosition}>#{index + 1}</span>
                        <h3 className={styles.choiceName}>{choice.itemName}</h3>
                        <div className={styles.votingContainer}>
                            <button onClick={() => handleVote(choice._id, 'up')} className={styles.voteButton}>👍</button>
                            <span className={styles.score}>{choice.score || 0}</span>
                            <button onClick={() => handleVote(choice._id, 'down')} className={styles.voteButton}>👎</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Placeholder for comments section */}
            <div className={styles.commentsSection}>
                <h2>Comments</h2>
                {user && !isAuthor && <CommentForm handleAddComment={handleAddComment} />}
                <div className={styles.commentsList}>
                    {rank.comments?.length ? (
                        rank.comments.map(comment => (
                            <div key={comment._id} className={styles.comment}>
                                <p className={styles.commentAuthor}>{comment.author?.username || 'Anonymous'}</p>
                                <p>{comment.text}</p>
                                {user?._id === comment.author?._id && (
                                    <button onClick={() => handleDeleteComment(comment._id)} className={styles.deleteCommentButton}>Delete</button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default RankDetails;