import React, { useState } from 'react';

function QuizEnvironment({ questions }) {
  
  console.log(questions);

  return (
    <div style={{ minHeight: '900px', padding: '1rem', backgroundColor: 'antiquewhite'}}>
      <h2>Quiz Environment</h2>
      <p>Data received</p>
    </div>
  );
}

export default QuizEnvironment;
