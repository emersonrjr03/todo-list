import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider } from './firebase';
import Button from 'react-bootstrap/Button';
import './LoginForm.css';
import { ButtonGroup, Col, Form, Row } from 'react-bootstrap';
import { Dropdown } from 'bootstrap';
import Logo from './Logo';

function LoginForm() {

    const [user, loading, error] = useAuthState(auth);

    const signIn = () => {
        
        auth.signInWithPopup(provider).then((user) => console.log(user)).catch((error) => alert(error.message));
    }

    const signUp = () => {

    }

    const accountCreationImplemented = false;

    return (
        <div className="login_form__content">
            {accountCreationImplemented ? 
                (<Form>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="3" >Email</Form.Label>
                        <Col sm="9">
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                        Password
                        </Form.Label>
                        <Col sm="9">
                        <Form.Control type="password" placeholder="Password" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Col sm="4">
                            <Button onClick={signUp} variant="link">Sign up</Button>
                        </Col>
                        <Col sm="8">
                            <Button onClick={signIn} className="btn btn-light w-100">Sign in</Button>
                        </Col>
                    </Form.Group>
                </Form>)
                : null
            }
            <hr className="login_form__divisor"/>
            
            <button type="button" className="login_form__login-with-google-btn mb-3" onClick={signIn} >
                Sign in with Google
            </button>

            <hr className="login_form__divisor"/>
        </div>
        
    )
}

export default LoginForm
