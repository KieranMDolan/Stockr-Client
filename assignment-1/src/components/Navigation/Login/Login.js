import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const API_URL = 'http://131.181.190.87:3000';

const Login = (props) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'email':
        setUserEmail(event.target.value);
        break;
      case 'password':
        setUserPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleErrors = (response) => {
    if (response.error) {
      throw Error(response.message);
    } else {
      return response;
    }
  };

  const login = () => {
    const url = `${API_URL}/user/login`;

    return fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    })
    .then((res) => res.json())
    .then(handleErrors)
      .then((res) => {
        localStorage.setItem('token', res.token);
        console.log("got to token");
      })
      .catch(error => console.log('There has been an error:' + error.message));
  };

  return (
    <Form inline>
      <Form.Control
        type="email"
        name="email"
        placeholder="email"
        className="mr-sm-2"
        onChange={handleChange}
      />
      <Form.Control
        type="password"
        name="password"
        placeholder="password"
        className="mr-sm-2"
        onChange={handleChange}
      />
      <Button variant="primary" className="mr-2" size="sm" onClick={login}>
        Login
      </Button>
      <Button variant="secondary" size="sm">
        Register
      </Button>
    </Form>
  );
};

export default Login;
