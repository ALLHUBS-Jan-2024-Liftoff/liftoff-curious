import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function HeaderComponent() {
  const location = useLocation();
  const isQuizInProgress = location.pathname === '/quiz';
  const [expanded, setExpanded] = useState(false);

  const handleNavLinkClick = () => setExpanded(false);

  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark" expanded={expanded} onToggle={setExpanded}>
        <Container>
          {isQuizInProgress ? (
            <Navbar.Brand>
              <img
                className="navbar-logo"
                src="./assets/images/Coders-Quiz-Logo_200x200_PNG.png"
                alt="Coders' Quiz"
              />
            </Navbar.Brand>
          ) : (
            <Navbar.Brand href="/">
              <img
                className="navbar-logo"
                src="./assets/images/Coders-Quiz-Logo_200x200_PNG.png"
                alt="Coders' Quiz"
              />
            </Navbar.Brand>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isQuizInProgress ? (
                <span style={{ color: 'grey' }}>Quiz in Progress...</span>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavLinkClick}>
                    Home
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavLinkClick}>
                    About
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/trivia" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavLinkClick}>
                    Trivia
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavLinkClick}>
                    Contact
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/quizmaster" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavLinkClick}>
                    Admin
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default HeaderComponent;
