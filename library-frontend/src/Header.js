// import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";

// function Header() {
//   const navigate = useNavigate();
//   let user = JSON.parse(localStorage.getItem("user-info"));
//   function logout() {
//     localStorage.clear();
//     navigate("/register");
//   }
//   return (
//     <div>
//       <Navbar bg="dark" data-bs-theme="dark">
//         <Container>
//           <Navbar.Brand href="#home">Library</Navbar.Brand>
//           <Nav className="me-auto navbar-wrapper">
//             {localStorage.getItem("user-info") ? (
//               <>
//                 <Link to="/">Record List</Link>
//                 <Link to="/add">Add Record</Link>
//                 <Link to="/update">Update Record</Link>
//                 <Link to="/search">Search Record</Link>
//               </>
//             ) : (
//               <>
//                 <Link to="/login">Login</Link>
//                 <Link to="/register">Register</Link>
//               </>
//             )}
//           </Nav>
//           {localStorage.getItem("user-info") ? (
//             <Nav>
//               <NavDropdown title={user && user.name}>
//                 <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
//               </NavDropdown>
//             </Nav>
//           ) : null}
//         </Container>
//       </Navbar>
//     </div>
//   );
// }

// export default Header;


import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css"; // Custom CSS file for additional styling

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
          <Navbar.Brand as={Link} to="/">
            📚 Library
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {localStorage.getItem("user-info") ? (
                <>
                  <Nav.Link as={Link} to="/">Record List</Nav.Link>
                  <Nav.Link as={Link} to="/add">Add Record</Nav.Link>
                  <Nav.Link as={Link} to="/update">Update Record</Nav.Link>
                  <Nav.Link as={Link} to="/search">Search Record</Nav.Link>


                  <Nav.Link as={Link} to="/addAuthor">Author</Nav.Link>
                  <Nav.Link as={Link} to="/addCategory">Category</Nav.Link>

                  <Nav.Link as={Link} to="/addBooks">Books</Nav.Link>
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
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
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