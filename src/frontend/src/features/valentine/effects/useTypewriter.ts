import { useState, useEffect } from 'react';

export function useTypewriter(lines: string[], enabled: boolean) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayedLines([]);
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
      setIsComplete(false);
      return;
    }

    if (currentLineIndex >= lines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = lines[currentLineIndex];
    
    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          if (newLines.length <= currentLineIndex) {
            newLines.push(currentLine.slice(0, currentCharIndex + 1));
          } else {
            newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
          }
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, 30); // Smooth typing speed

      return () => clearTimeout(timer);
    } else {
      // Move to next line after a brief pause
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [enabled, lines, currentLineIndex, currentCharIndex]);

  return { displayedLines, isComplete };
}
