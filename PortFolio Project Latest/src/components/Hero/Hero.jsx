import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import TextType from './TextType';
import './Hero.css';

const socials = [
  { icon: <FiGithub />, href: 'https://github.com/AnsariUsaid', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/ansariusaid', label: 'LinkedIn' },
  { icon: <SiLeetcode />, href: 'https://leetcode.com/u/Codelearner005/', label: 'LeetCode' },
  { icon: <FiMail />, href: 'mailto:ansariusaid@gmail.com', label: 'Email' },
];

export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Background */}
      <div className="hero-bg">
        <div className="hero-gradient" />
      </div>

      <div className="hero-content">
        {/* Greeting */}
        <motion.p
          className="hero-greeting"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hello, I&apos;m
        </motion.p>

        {/* Animated Name */}
        <motion.h1
          className="hero-name"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <TextType
            text={['Ansari Usaid Anzer']}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="_"
            texts={['Ansari Usaid Anzer']}
            deletingSpeed={50}
            variableSpeedEnabled={false}
            variableSpeedMin={60}
            variableSpeedMax={120}
            cursorBlinkDuration={0.5}
          />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="hero-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          3rd Year B.Tech CSE Student @ VIT — Passionate about AI, Machine Learning,
          Web Development &amp; Cloud Computing.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="hero-buttons"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <Link to="projects" smooth duration={600} offset={0}>
            <motion.button
              className="hero-btn hero-btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View Projects <FiArrowRight />
            </motion.button>
          </Link>
          <Link to="contact" smooth duration={600} offset={0}>
            <motion.button
              className="hero-btn hero-btn-secondary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Get In Touch
            </motion.button>
          </Link>
        </motion.div>

        {/* Socials */}
        <motion.div
          className="hero-socials"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          {socials.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label={s.label}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span>Scroll</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}
