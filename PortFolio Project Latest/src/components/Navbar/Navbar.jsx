import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const navItems = ['home', 'about', 'skills', 'education', 'projects', 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <motion.nav
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="navbar-inner">
        <Link to="home" smooth duration={600} offset={0}>
          <motion.span
            className="navbar-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ansari.
          </motion.span>
        </Link>

        {/* Desktop links */}
        <div className="navbar-links">
          {navItems.map((item, i) => (
            <Link
              key={item}
              to={item}
              spy
              smooth
              duration={600}
              offset={0}
              activeClass="active"
              className="navbar-link"
            >
              <motion.span
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.span>
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <div
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {navItems.map((item, i) => (
              <Link
                key={item}
                to={item}
                spy
                smooth
                duration={600}
                offset={0}
                className="navbar-link"
                onClick={() => setMenuOpen(false)}
              >
                <motion.span
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.06 * i, duration: 0.3 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
