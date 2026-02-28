import { useEffect, useMemo, useState } from 'react';

export default function TextType({
  text = [],
  typingSpeed = 75,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = '_',
  texts,
  deletingSpeed = 50,
  variableSpeedEnabled = false,
  variableSpeedMin = 60,
  variableSpeedMax = 120,
  cursorBlinkDuration = 0.5,
}) {
  const textList = useMemo(() => {
    const values = Array.isArray(texts) && texts.length > 0 ? texts : text;
    return Array.isArray(values) && values.length > 0 ? values : [''];
  }, [text, texts]);

  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = textList[textIndex] ?? '';
    const getTypingSpeed = () => {
      if (!variableSpeedEnabled) return typingSpeed;
      return Math.floor(Math.random() * (variableSpeedMax - variableSpeedMin + 1)) + variableSpeedMin;
    };

    let timer;

    if (!isDeleting && displayedText.length < currentText.length) {
      timer = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      }, getTypingSpeed());
    } else if (!isDeleting && displayedText.length === currentText.length) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length - 1));
      }, deletingSpeed);
    } else {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % textList.length);
    }

    return () => clearTimeout(timer);
  }, [
    deletingSpeed,
    displayedText,
    isDeleting,
    pauseDuration,
    textIndex,
    textList,
    typingSpeed,
    variableSpeedEnabled,
    variableSpeedMax,
    variableSpeedMin,
  ]);

  return (
    <span className="text-type">
      <span>{displayedText}</span>
      {showCursor && (
        <span className="text-type-cursor" style={{ animationDuration: `${cursorBlinkDuration}s` }}>
          {cursorCharacter}
        </span>
      )}
    </span>
  );
}
