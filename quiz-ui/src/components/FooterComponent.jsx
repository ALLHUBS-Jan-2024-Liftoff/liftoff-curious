import React from 'react'

function FooterComponent() {
  return (
    <footer className="footer" style={{ textAlign: 'center', backgroundColor: '#3F3F3F', padding: '1.8rem 0.5rem 0.8rem 0.5rem', lineHeight: '100%', fontSize: '90%', color: '#f3f3f3'}}>
      <p>Created by Team Curious with passion and full-stack web development skills: React, Bootstrap, Java, Spring Boot, and MySQL.</p>
      <p>Based on the requirements of the Capstone Project for the LaunchCode Full-Stack Web Development Course 2024. View the source code on <a href="https://github.com/ALLHUBS-Jan-2024-Liftoff/liftoff-curious" target="_blank" rel="noopener noreferrer" style={{ color: 'white'}}>GitHub</a>.</p>
    </footer>
  )
}

export default FooterComponent