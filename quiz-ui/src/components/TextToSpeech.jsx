import React, { useEffect } from 'react';

const TextToSpeech = ({ text }) => {
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Your browser does not support the Web Speech API');
    }
  }, [text]);

  return (
    <>
    {/* <div className="border rounded bg-light p-2">
        <p>Reading the question out loud...</p>
      <p>{text}</p>
    </div> */}
    </>
  );
};

export default TextToSpeech;
