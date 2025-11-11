import { useState } from 'react';
import styles from './CommentForm.module.css';

const CommentForm = ({ handleAddComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      handleAddComment({ text });
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        className={styles.commentTextarea}
        required
      />
      <button type="submit" className={styles.submitButton}>Post Comment</button>
    </form>
  );
};

export default CommentForm;