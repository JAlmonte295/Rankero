import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as rankService from '../../services/rankService';
import PageHeader from '../PageHeader/PageHeader';
import { UserContext } from '../../contexts/UserContext';
import styles from './RankDetails.module.css';
import CommentForm from '../CommentForm/CommentForm';
import upvoteImage from '../../assets/images/thumbsUp.png';
import downvoteImage from '../../assets/images/thumbsDown.png';

const RankDetails = ({ handleDeleteRank, handleUpdateComment, handleUpdateSingleRank }) => {
    const { rankId } = useParams();
    const { user } = useContext(UserContext);
    const [rank, setRank] = useState(null);
    const navigate = useNavigate();
    const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
    const [preview, setPreview] = useState({ url: null, x: 0, y: 0 });

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
            handleUpdateSingleRank(updatedRank); 
        } catch (error) { 
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
            handleUpdateSingleRank(updatedRank); 
            setIsCommentFormVisible(false); 
        } catch (error) { 
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const updatedRank = await rankService.deleteComment(rankId, commentId);
            setRank(updatedRank);
            handleUpdateSingleRank(updatedRank); 
        } catch (error) { 
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
            handleUpdateSingleRank(updatedRank); 
        } catch (error) { 
        }
    };

    const isAuthor = user && rank && user._id === rank.author?._id;

    const handleBack = () => {
        isAuthor ? navigate('/my-ranks') : navigate(-1);
    };

    const handleMouseMove = (e) => {
        if (preview.url) {
            setPreview(p => ({ ...p, x: e.clientX, y: e.clientY }));
        }
    };

    const handleMouseEnter = (imageUrl) => {
        if (imageUrl) {
            setPreview(p => ({ ...p, url: imageUrl }));
        }
    };

    if (!rank) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <button onClick={handleBack} className={styles.backButton}>
                &larr; Back
            </button>
            <PageHeader title={rank.title} category={rank.category} />
            <div className={styles.rankMeta}>                <p className={styles.description}>{rank.description}</p>
                <p className={styles.author}>
                    Created by: <span>{rank.author?.username || 'Unknown'}</span>
                </p>
                {!isAuthor && (
                    <div className={styles.rankVotingContainer}>
                        <button onClick={() => handleRankVote('up')} className={styles.rankVoteButton}><img src={upvoteImage} alt="Upvote" /></button>
                        <span className={styles.rankScore}>{rank.score || 0}</span>
                        <button onClick={() => handleRankVote('down')} className={styles.rankVoteButton}><img src={downvoteImage} alt="Downvote" /></button>
                    </div>
                )}
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
                        onMouseEnter={() => handleMouseEnter(choice.imageUrl)}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setPreview({ url: null, x: 0, y: 0 })}
                        style={{ backgroundImage: choice.imageUrl ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${choice.imageUrl})` : '' }}
                    >
                        <span className={styles.rankPosition}>#{index + 1}</span>
                        <h3 className={styles.choiceName}>{choice.itemName}</h3>
                        {!isAuthor && (
                            <div className={styles.votingContainer}>
                                <button onClick={() => handleVote(choice._id, 'up')} className={styles.voteButton}>▲</button>
                                <span className={styles.score}>{choice.score || 0}</span>
                                <button onClick={() => handleVote(choice._id, 'down')} className={styles.voteButton}>▼</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.commentsSection}>
                <h2>Comments</h2>
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
                {user && !isAuthor && (
                    isCommentFormVisible ? (
                        <CommentForm handleAddComment={handleAddComment} />
                    ) : (
                        <div className={styles.addCommentContainer}>
                            <button onClick={() => setIsCommentFormVisible(true)} className={styles.addCommentButton}>
                                Add a Comment
                            </button>
                        </div>
                    )
                )}
            </div>
            {preview.url && (
                <img
                    src={preview.url}
                    alt="Preview"
                    className={styles.imagePreview}
                    style={{ top: `${preview.y + 15}px`, left: `${preview.x + 15}px` }}
                />
            )}
        </div>
    );
};

export default RankDetails;