import React, { useState, useEffect, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

const API_URL = 'http://131.181.190.87:3000';
const MILLISECONDS_TO_SECONDS = 1000;

/**
 * A component that handles login detail input and links to the registration page if the user is not
 * logged in, or shows a logout button if they are.
 * @param {*} props 
 */
const Login = (props) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  // history for rerouting
  const history = useHistory();

  // upon component mount
  useEffect(() => {
    // check if login token is present
    if (localStorage.getItem('token') !== null) {
      setLoggedIn(true);
    }
    // if expireTime is recorded
    if (localStorage.getItem('expireTime') !== null) {
      // get current UNIX time
      let nowDate = Date.now();
      // if current time exceeds stored expiry time
      if (nowDate >= localStorage.getItem('expireTime')) {
        logout();
      }
    }
  }, []);

  /**
   * binds userEmail or userPassword state values to event value depending upon which one has changed
   * @param {*} event 
   */
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

  /**
   * handles error encounters in a fetch.then method chain. Throws an error if encountered and
   * stores error values in state or returns response if no error encountered.
   * @param {*} response 
   */
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

  /**
   * Gets the expiry date in UNIX time of when a token will expire
   * @param {*} tokenExpire number in seconds that the token will expire in
   */
  const getExpireDate = (tokenExpire) => {
    let myDate = Date.now() + tokenExpire * MILLISECONDS_TO_SECONDS;
    return myDate;
  }

  /**
   * Makes a login POST to the API using stored state values for userEmail and userPassword
   */
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
        localStorage.setItem('expireTime', getExpireDate(res.expires_in));
        setLoggedIn(true);
        localStorage.setItem('token', res.token);
        // reload window to ensure all components reload (in case user is in authorised route)
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  /**
   * Deletes the token and expireTime from local storage and logs user out
   */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expireTime');
    setLoggedIn(false);
    // reload window to ensure access to authorised routes' data is not accessible following logout
    window.location.reload();
  };

  /**
   * Push new route to Register page to history. This avoids styling conflicts with the register
   * button component that using a link component or tag would cause.
   */
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
