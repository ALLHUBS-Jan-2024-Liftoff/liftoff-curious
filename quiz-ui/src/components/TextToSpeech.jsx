import React, { useEffect } from 'react';

const TextToSpeech = ({ text }) => {
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Your browser does not support the Web Speech API');
    }
  }, [text]);

  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

export default TextToSpeech;