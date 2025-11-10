import React from 'react';

function MenuButton({ onClick }) {
  return (
    <button className="menu-button" onClick={onClick} aria-label="Toggle navigation">
      <span />
      <span />
      <span />
    </button>
  );
}

export default MenuButton;