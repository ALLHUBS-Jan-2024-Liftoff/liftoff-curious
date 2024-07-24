import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function HeaderComponent() {


  const location = useLocation();
  const isQuizInProgress = location.pathname === '/quiz';

  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
      {isQuizInProgress ? (<Navbar.Brand>Coders' Quiz</Navbar.Brand>) : (<Navbar.Brand href="/">Coders' Quiz</Navbar.Brand>)}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          {isQuizInProgress ? (
          <span style={{color: "grey"}}>Quiz in Progress...</span>
        ) : (
          <>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/trivia">Trivia</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
            <Nav.Link href="/quizmaster">QuizMaster</Nav.Link>
          </>
        )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default HeaderComponent;