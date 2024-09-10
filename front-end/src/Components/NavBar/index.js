import { Container, Nav, Navbar }from 'react-bootstrap';

function NavBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Classificação dos computadores</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/lista">Lista dos computadores</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;