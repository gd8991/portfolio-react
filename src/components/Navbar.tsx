import React from 'react';

type NavbarProps = {
  onNavClick: (e: React.MouseEvent, targetId: string) => void;
  onToggleMenu: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onNavClick, onToggleMenu }) => {
  return (
    <header>
      <nav className="navbar">
        <div className="nav-container">
          <div
            className="hamburger"
            id="hamburger"
            onClick={onToggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul className="nav-menu" id="nav-menu">
            {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
              <li key={item} className="nav-item">
                <a
                  className="btn-nav"
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => onNavClick(e, `#${item.toLowerCase()}`)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;


