import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import styles from './SignUpForm.module.css';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signUp(formData);
      navigate('/sign-in');
    } catch (err) {
      console.error(err);
      // You can add error handling here, e.g., displaying a message to the user
    }
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Sign Up</h1>
        <label htmlFor="username-input">Username</label>
        <input
          type="text"
          id="username-input"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="email-input">Email</label>
        <input type="email" id="email-input" name="email" value={formData.email} onChange={handleChange} required />
        <label htmlFor="password-input">Password</label>
        <input
          type="password"
          id="password-input"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.submitButton}>Sign Up</button>
      </form>
    </main>
  );
};

export default SignUpForm;