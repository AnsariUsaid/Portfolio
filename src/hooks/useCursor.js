import { useState, useEffect, useRef } from 'react';

export function useCursor() {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    const over = (e) => setHover(!!e.target.closest("a, button, [data-cursor='hover']"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);
  return { ref, hover };
}
