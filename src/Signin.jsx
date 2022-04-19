import React, { useRef, useContext } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { Context } from './Context';

export default function Signin() {

  const { validation, siwep, erreur, modalState, closeModal,toggleModal } = useContext(Context)

  const inputs = useRef([]);

  const addInputs = data => {
    if (data && !inputs.current.includes(data)) {
      inputs.current.push(data);
    }
  };

  const handleForm = async (data) => {
    data.preventDefault()
    await siwep(inputs.current[0].value, inputs.current[1].value)
  };

  return (
    <>{modalState.signIn && (
      <div class="position-fixed top-0 vw-100 vh-100">
        <div className="w-100 h-100 bg-dark bg-opacity-75">
          <Container className='position-absolute top-50 start-50 translate-middle' style={{ width: "350px" }}>
            <Card>
              <Card.Body>
                <Card.Title className="modal-header">
                  <h3>Sign In</h3>
                  <button onClick={closeModal} className="btn-close"></button>
                </Card.Title>
                {erreur && (<Alert variant='danger'>{validation}</Alert>)}
                <Form onSubmit={handleForm}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={addInputs} required />
                  </Form.Group>
                  <Form.Group id="password" className='mt-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={addInputs} required />
                  </Form.Group>
                  <p>Want to <span className='text-primary' style={{cursor:'pointer'}} onClick={() => toggleModal('signup')}>sign Up</span>?</p>
                  <Button className='btn btn-primary mt-2' type='submit'>Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>)}
    </>
  )
}
