import React from 'react';
import MenuButton from '../MenuButton/MenuButton';
import styles from './Header.module.css';

const Header = ({ pageTitle, toggleNav }) => {
  return (
    <header className={styles.header}>
      <div className={styles.titleContainer}>
        <h1>{pageTitle}</h1>
      </div>
      <MenuButton onClick={toggleNav} />
    </header>
  );
};

export default Header;