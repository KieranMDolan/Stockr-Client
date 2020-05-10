import React, { useState, useEffect, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

const API_URL = 'http://131.181.190.87:3000';

const Login = (props) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoggedIn(true);
    }
  }, []);
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
      let updatedErrorState = { ...props.loginError };
      updatedErrorState.isError = true;
      updatedErrorState.errorMessage = response.message;
      props.setLoginError(updatedErrorState);
      setLoggedIn(false);
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
        setLoggedIn(true);
        localStorage.setItem('token', res.token);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    window.location.reload();
  };

  const routeChangeRegister = () => {
    let path = '/register';
    history.push(path);
  };

  // conditionally store the form JSX to render depending on if the user is logged in
  let formJSX;
  if (loggedIn) {
    formJSX = (
      <Button variant="warning" className="mr-2" size="sm" onClick={logout}>
        Logout
      </Button>
    );
  } else {
    formJSX = (
      <Fragment>
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
        <Button variant="secondary" size="sm" onClick={routeChangeRegister}>
          Register
        </Button>
      </Fragment>
    );
  }

  return <Form inline>{formJSX}</Form>;
};

export default Login;
