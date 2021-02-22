import React from "react";
import { Navbar } from "react-bootstrap";

export default function TopNav() {
  return (
    <Navbar className="bg-blue">
      <Navbar.Brand href="/" className="text-white font-weight-bold font-16">
        Flight List
      </Navbar.Brand>
    </Navbar>
  );
}
