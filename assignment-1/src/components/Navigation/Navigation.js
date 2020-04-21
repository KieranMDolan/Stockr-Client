import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <Navbar expand="lg" bg="primary" variant="dark">
      <Navbar.Brand href="/">Stockr</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/stocks">Stocks</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/quote">Quote</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/history">Price History</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation;