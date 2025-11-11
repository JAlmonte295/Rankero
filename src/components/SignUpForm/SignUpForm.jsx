import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import styles from '../Form/Form.module.css';
import { UserContext } from '../../contexts/UserContext';
import PageHeader from '../PageHeader/PageHeader';

const SignUpForm = () => {

  useEffect(() => {
    document.title = 'Rankero - Sign Up';
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConf) {
      setError('Passwords do not match');
      return;
    }
    try {
      await authService.signUp(formData);
      const user = await authService.signIn(formData);
      setUser(user);
      navigate('/my-ranks');
    } catch (err) {
      setError(err.message || 'An error occurred during sign up.');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <PageHeader title="Sign Up" />
        {error && <p className={styles.error}>{error}</p>}
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
        <label htmlFor="passwordConf-input">Confirm Password</label>
        <input
          type="password"
          id="passwordConf-input"
          name="passwordConf"
          value={formData.passwordConf}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.submitButton}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;