import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Container } from 'react-bootstrap';
import SearchResults from '../api/Cryptoapi';

export default function CryptoNavbar() {
  const [searchValue, setSearchValue] = useState('Bitcoin');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
    setSearchValue('');
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Crypto Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/portfolio">Portfolio</Nav.Link>
              <Nav.Link href="/news">News</Nav.Link>
            </Nav>
            <Form inline onSubmit={handleFormSubmit}>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                value={searchValue}
                onChange={handleInputChange}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SearchResults searchValue={searchValue} />
    </div>
  );
}
