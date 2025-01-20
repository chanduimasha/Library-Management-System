import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Library</Navbar.Brand>
          <Nav className="me-auto navbar-wrapper">
            <Link to="/add">Add Record</Link>
            <Link to="/update">Update Record</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
