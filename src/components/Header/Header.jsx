import React from 'react';
import MenuButton from '../MenuButton/MenuButton';
import styles from './Header.module.css';

const Header = ({ toggleNav }) => {
  return (
    <header className={styles.header}>
      <MenuButton onClick={toggleNav} />
    </header>
  );
};

export default Header;