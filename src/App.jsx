import React, { useContext } from 'react';
import ReactDOM from 'react-dom'
import Signup from './Signup';
import Provider, { Context } from './Context';
import { Button, Navbar } from 'react-bootstrap';
import Signin from './signin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Apropos from './publicpages/Apropos';
import Accueil from './publicpages/Accueil';
import { Container } from 'react-bootstrap';

function App() {
  const { toggleModal, so } = useContext(Context)
  const onsignout = async () => {
    await so()
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/accueil" className='px-4'><b>Mon Portfolio</b></Navbar.Brand>
          <Navbar.Brand href="/apropos" className='px-2'><b>À propos</b></Navbar.Brand>
          <Container className='justify-content-end'>
            <Button className='btn btn-primary' onClick={() => toggleModal('signup')}>Sign up</Button>
            <Button className='btn btn-primary ms-2' onClick={() => toggleModal('signin')}>Sign in</Button>
            <Button className='btn btn-danger mx-2' onClick={onsignout}>Sign out</Button>
            </Container>
      </Navbar>


      <Signup />
      <Signin />
    </>
  );
}

ReactDOM.render(
  <Provider><Router>
    <App />
    <Routes>
      <Route path="/apropos" element={<Apropos />} />
      <Route path="/accueil" element={<Accueil />} />
    </Routes>
  </Router></Provider>,
  document.getElementById('root')
)
