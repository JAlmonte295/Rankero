import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import styles from '../Form/Form.module.css';
import { UserContext } from '../../contexts/UserContext';
import PageHeader from '../PageHeader/PageHeader';

const SignUpForm = () => {

  useEffect(() => {
    document.title = 'Sign Up';
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signUp(formData);
      const user = await authService.signIn(formData);
      setUser(user);
      navigate('/my-ranks');
    } catch (err) {
      console.error(err);
      // You can add error handling here, e.g., displaying a message to the user
    }
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <PageHeader title="Sign Up" />
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
        <button type="submit" className={styles.submitButton}>Sign Up</button>
      </form>
    </main>
  );
};

export default SignUpForm;