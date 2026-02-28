import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import './Contact.css';

const socials = [
  { icon: <FiGithub />, href: 'https://github.com/AnsariUsaid', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/ansariusaid', label: 'LinkedIn' },
  { icon: <SiLeetcode />, href: 'https://leetcode.com/u/ansariusaid/', label: 'LeetCode' },
  { icon: <FiMail />, href: 'mailto:ansariusaid@gmail.com', label: 'Email' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      // Using Formspree — replace with your form endpoint
      const res = await fetch('https://formspree.io/f/xyzgobdl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact section" id="contact" ref={ref}>
      <div className="contact-inner">
        <motion.div
          className="contact-header"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">
            Feel free to reach out for collaborations, opportunities, or just to say hello.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Info */}
          <motion.div
            className="contact-info"
            initial={{ x: -30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="contact-info-text">
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision. Let&apos;s connect and build
              something great together.
            </p>

            <div className="contact-details">
              <a href="mailto:ansariusaid@gmail.com" className="contact-detail">
                <span className="contact-detail-icon"><FiMail /></span>
                ansariusaid@gmail.com
              </a>
              <div className="contact-detail">
                <span className="contact-detail-icon"><FiMapPin /></span>
                Vellore, India
              </div>
            </div>

            <div className="contact-socials">
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-btn"
                  aria-label={s.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ x: 30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="form-group">
              <label className="form-label" htmlFor="name">Name</label>
              <input
                className="form-input"
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea
                className="form-textarea"
                id="message"
                name="message"
                placeholder="Tell me about your project or opportunity..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <motion.button
              className="form-submit"
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent ✓' : <>Send Message <FiSend /></>}
            </motion.button>
          </motion.form>
        </div>

        {/* Footer */}
        <div className="footer">
          <p className="footer-text">
            © {new Date().getFullYear()} Ansari Usaid Anzer. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
