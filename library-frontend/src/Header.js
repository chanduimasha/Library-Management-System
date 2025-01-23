import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user-info"));

  function logout() {
    localStorage.clear();
    navigate("/register");
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/books">
            📚 Library
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {localStorage.getItem("user-info") ? (
                <>
                  <Nav.Link as={Link} to="/books">
                    Books
                  </Nav.Link>
                  <Nav.Link as={Link} to="/reader">
                    Readers
                  </Nav.Link>
                  <Nav.Link as={Link} to="/author">
                    Author
                  </Nav.Link>
                  <Nav.Link as={Link} to="/category">
                    Category
                  </Nav.Link>
                  <Nav.Link as={Link} to="/search">
                    Search
                  </Nav.Link>
                </>
              ) : null}
            </Nav>
            <Nav className="ml-auto">
              {localStorage.getItem("user-info") ? (
                <NavDropdown title={user && user.name}>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
