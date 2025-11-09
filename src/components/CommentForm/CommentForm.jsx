import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as rankService from '../../services/rankService';

const CommentForm = (props) => {
    const [formData, setFormData] = useState({ text: '' });
    const { rankId, commentId } = useParams();
    const navigate = useNavigate();

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (commentId) {
            props.handleUpdateComment(rankId, commentId, formData);
        } else {
            props.handleAddComment(formData);
            setFormData({ text: '' });
        }
    };

    useEffect(() => {
        const fetchRank = async () => {
            const rankData = await rankService.show(rankId);
            setFormData(rankData.comments.find((comment) => comment._id === commentId));
        };
        if (rankId && commentId) fetchRank();
    }, [rankId, commentId]);

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='text-input'>Your comment:</label>
            <textarea
                required
                type='text'
                id='text-input'
                name='text'
                value={formData.text}
                onChange={handleChange}
            />
            <button type='submit'>Submit</button>
        </form>
    );
};

export default CommentForm;