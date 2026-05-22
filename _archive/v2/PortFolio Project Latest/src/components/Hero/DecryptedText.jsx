import { useEffect, useRef, useState, useCallback } from 'react';
import { useInView } from 'framer-motion';

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';

export default function DecryptedText({
  text = '',
  speed = 50,
  maxIterations = 20,
  characters = DEFAULT_CHARS,
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'view',
  revealDirection = 'start',
  sequential = true,
  useOriginalCharsOnly = false,
}) {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-30px' });
  const [revealed, setRevealed] = useState([]);
  const [display, setDisplay] = useState([]);
  const hasStarted = useRef(false);

  const chars = useOriginalCharsOnly
    ? text.replace(/\s/g, '')
    : characters;

  const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

  /* Initialise display with scrambled text */
  useEffect(() => {
    const init = text.split('').map((ch) =>
      ch === ' ' ? ' ' : randomChar()
    );
    setDisplay(init);
    setRevealed(new Array(text.length).fill(false));
  }, [text]);

  /* Core animation */
  const runAnimation = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const letters = text.split('');
    // Build reveal order
    const nonSpaceIndices = [];
    letters.forEach((ch, i) => { if (ch !== ' ') nonSpaceIndices.push(i); });

    let order;
    if (revealDirection === 'end') {
      order = [...nonSpaceIndices].reverse();
    } else if (revealDirection === 'center') {
      const mid = Math.floor(nonSpaceIndices.length / 2);
      order = [];
      for (let k = 0; k < nonSpaceIndices.length; k++) {
        const offset = Math.floor((k + 1) / 2);
        const idx = k % 2 === 0 ? mid + offset : mid - offset;
        if (idx >= 0 && idx < nonSpaceIndices.length) order.push(nonSpaceIndices[idx]);
      }
    } else {
      order = [...nonSpaceIndices]; // 'start'
    }

    let tick = 0;
    let nextReveal = 0;

    const interval = setInterval(() => {
      tick++;

      setDisplay((prev) => {
        const next = [...prev];
        for (let i = 0; i < letters.length; i++) {
          if (letters[i] === ' ') continue;
          // Already revealed? Keep it
          if (next[i] === letters[i] && tick > 1) continue;
          // Scramble un-revealed characters
          next[i] = randomChar();
        }
        return next;
      });

      // Every few ticks, reveal the next character(s)
      if (sequential) {
        // reveal one character per tick
        if (nextReveal < order.length) {
          const revealIdx = order[nextReveal];
          setDisplay((prev) => {
            const next = [...prev];
            next[revealIdx] = letters[revealIdx];
            return next;
          });
          setRevealed((prev) => {
            const next = [...prev];
            next[revealIdx] = true;
            return next;
          });
          nextReveal++;
        }
      } else {
        // Reveal all at once after maxIterations
        if (tick >= maxIterations) {
          setDisplay(letters);
          setRevealed(new Array(letters.length).fill(true));
        }
      }

      // Done?
      const allDone = sequential
        ? nextReveal >= order.length
        : tick >= maxIterations;

      if (allDone) {
        clearInterval(interval);
        // Ensure final state is correct
        setDisplay([...letters]);
        setRevealed(new Array(letters.length).fill(true));
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, revealDirection, sequential]);

  /* Trigger based on animateOn prop */
  useEffect(() => {
    if (animateOn === 'view' && inView) {
      runAnimation();
    }
  }, [inView, animateOn, runAnimation]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      runAnimation();
    }
  };

  return (
    <span
      ref={containerRef}
      className={parentClassName}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline' }}
    >
      {display.map((ch, i) => (
        <span
          key={i}
          className={revealed[i] ? className : encryptedClassName}
          style={{
            opacity: revealed[i] ? 1 : 0.5,
            transition: 'opacity 0.1s ease',
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
