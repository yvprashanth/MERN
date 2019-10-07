import React, { Component } from 'react'
import {  Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomNavbar.css'

export default class MyNavbar extends Component {
  render() {
    return (
      <Nav
      activeKey="/home"
      onSelect={selectedKey => alert(`selected ${selectedKey}`)}>
        <Nav.Item>
          <Nav.Link href="/home">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled">
            Disabled
          </Nav.Link>
        </Nav.Item>
    </Nav>
    )
  }
}