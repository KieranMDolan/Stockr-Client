import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from './Login/Login';

const Navigation = (props) => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Stockr</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item><Nav.Link href="/stocks/symbols">Stocks</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/history/A">History</Nav.Link></Nav.Item>
        </Nav>
      <Login {...props}/>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation;