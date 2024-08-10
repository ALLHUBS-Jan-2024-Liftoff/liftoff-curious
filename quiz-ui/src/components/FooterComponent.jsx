import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FooterComponent() {
  const [attemptCount, setAttemptCount] = useState('000');

  useEffect(() => {
    const fetchAttemptCount = async () => {
      try {
        const response = await axios.get('http://localhost:8080/quiz-api/questions/requestcount');
        const count = response.data;
        setAttemptCount(count.toString().padStart(3, '0'));
      } catch (error) {
        console.error('Error fetching attempt count:', error);
      }
    };

    fetchAttemptCount();
  }, []);

  return (
    <footer className="footer" style={{ 
      textAlign: 'center', 
      background: 'linear-gradient(180deg, #343a40, #212529)',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(10px)',
      padding: '1.8rem 0.5rem 0.8rem 0.5rem', 
      lineHeight: '100%', 
      fontSize: '90%', 
      color: '#f3f3f3'
    }}>
      <p>Created by Team Curious with passion and full-stack web development skills: React, Bootstrap, Java, Spring Boot, and MySQL.</p>
      <p>Based on the requirements of the Capstone Project for the LaunchCode Full-Stack Web Development Course 2024. View the source code on <a href="https://github.com/ALLHUBS-Jan-2024-Liftoff/liftoff-curious" target="_blank" rel="noopener noreferrer" style={{ color: 'white'}}>GitHub</a>.</p>
      <p>Coders' Quiz have been attempted {attemptCount} times to date! Will you make the next attempt?</p>
    </footer>
  );
}

export default FooterComponent;
