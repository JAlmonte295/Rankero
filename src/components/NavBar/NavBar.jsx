import { useContext } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import { UserContext } from '../../contexts/UserContext';
import styles from './NavBar.module.css';


const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className={`navbar ${styles.container}`}>
      <Link to="/">
        <img src={logo} alt="Rankero" />
      </Link>
      {user ? (
        <ul>
          <li><Link to='/'>Ranks</Link></li>
          <li><Link to='/ranks/new'>New Rank</Link></li>
          <li><Link to='/my-ranks'>My Ranks</Link></li>
          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to='/'>Ranks</Link></li>
          <li><Link to='/sign-in'>Sign In</Link></li>
          <li><Link to='/sign-up'>Sign Up</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
