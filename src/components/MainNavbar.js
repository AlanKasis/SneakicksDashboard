import React from 'react'
import Navbar from 'react-bootstrap/esm/Navbar';
import Container from 'react-bootstrap/esm/Container';

const MainNavbar = () => {
  return (
    <Navbar style={{margin: '0rem 1rem'}}>
        <Navbar.Brand href="#home">Sneakicks Dashboard</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default MainNavbar