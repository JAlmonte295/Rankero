import { useState } from 'react';

const CommentForm = (props) => {
    const [formData, setFormData] = useState({ text: '' });

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAddComment(formData);
        setFormData({ text: '' });
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