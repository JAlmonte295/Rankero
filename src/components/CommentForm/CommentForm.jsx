import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const CommentForm = (props) => {
    const location = useLocation();
    const [formData, setFormData] = useState({ text: location.state?.commentText || '' });
    const { rankId, commentId } = useParams();

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