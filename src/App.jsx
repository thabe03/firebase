import React, { useContext } from 'react';
import ReactDOM from 'react-dom'
import Signup from './Signup';
import Provider, { Context } from './Context';
import { Button, Container } from 'react-bootstrap';
import Signin from './signin';

function App() {
  const { toggleModal, so } = useContext(Context)
  const onsignout = async () => {
    await so()
  };
  return (
    <>
      <nav class="navbar bg-light navbar-light justify-content-end">
        <Button className='btn btn-primary' onClick={() => toggleModal('signup')}>Sign p</Button>
        <Button className='btn btn-primary ms-2' onClick={() => toggleModal('signin')}>Sign in</Button>
        <Button className='btn btn-danger mx-2' onClick={onsignout}>Sign out</Button>
      </nav>
      <Signup />
      <Signin />
    </>
  );
}

ReactDOM.render(
  <Provider><App /></Provider>,
  document.getElementById('root')
)
