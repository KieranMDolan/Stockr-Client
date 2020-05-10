import React, { useState, useEffect } from 'react';
import styles from './Register.module.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const API_URL = 'http://131.181.190.87:3000';

const Register = (props) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState({ isError: false, errorMessage: '' });
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    setRegistered(false);
  }, []);

  const registerUser = () => {
    const url = `${API_URL}/user/register`;

    return fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    })
      .then((res) => res.json())
      .then((res) => handleErrors(res))
      .then((res) => {
        setError({ isError: false, errorMessage: '' });
        setRegistered(true);
      })
      .catch((error) => console.log(error.message));
  };

  const handleChange = (event) => {
    let value = event.target.value;

    switch (event.target.name) {
      case 'email':
        setUserEmail(value);
        break;
      case 'password':
        setUserPassword(value);
        break;
      default:
        break;
    }
  };

  const handleErrors = (response) => {
    if (response.error) {
      setError({ isError: true, errorMessage: response.message });
      throw Error(response.message);
    } else {
      return response;
    }
  };

  let formJSX;
  if (registered) {
    formJSX = (
      <Card.Text>
        Your account has successfully been created, you may now log in!
      </Card.Text>
    );
  } else {
    formJSX = (
      <Form>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <Form.Text className={styles.errorText}>
            {error.errorMessage}
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Form.Text className={styles.errorText}>
            {error.errorMessage}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" onClick={registerUser}>
          Register
        </Button>
      </Form>
    );
  }
  return (
    <Card>
      <Card.Header>
        <Card.Title>Registration</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          Registering as a user will give you acccess to the price history of
          stocks
        </Card.Text>
        {formJSX}
      </Card.Body>
    </Card>
  );
};

export default Register;
