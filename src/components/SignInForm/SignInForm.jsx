import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import styles from '../Form/Form.module.css';
import PageHeader from '../PageHeader/PageHeader';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    document.title = 'Sign In';
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signIn(formData);
      setUser(user);
      navigate('/');
    } catch (err) {
      console.error(err);
      // You can add error handling here, e.g., displaying a message to the user
    }
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <PageHeader title="Sign In" />
        <label htmlFor="username-input">Username</label>
        <input
          type="text"
          id="username-input"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password-input">Password</label>
        <input
          type="password"
          id="password-input"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.submitButton}>Sign In</button>
      </form>
    </main>
  );
};

export default SignInForm;