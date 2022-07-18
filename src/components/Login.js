import React, { useState } from 'react';
import { SERVER_URL } from '../constants';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import ListCars from './ListCars';
import Snackbar from '@mui/material/Snackbar';

function Login() {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const Logout = () => {
    sessionStorage.removeItem('jwt');
    setAuth(false);
  };

  const [isAuthenticated, setAuth] = useState(false);

  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const login = () => {
    fetch(SERVER_URL + 'login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }).then((res) => {
      const jwtToken = res.headers.get('Authorization');
      if (jwtToken !== null) {
        sessionStorage.setItem('jwt', jwtToken);
        setAuth(true);
      } else {
        setOpen(true);
      }
    });
  };

  if (isAuthenticated) {
    return <ListCars />;
  } else {
    return (
      <div>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={3000}
          message="Login failed: Please check your username and password"
        />
        <Stack spacing={2} alignItems="center" mt={2}>
          <TextField name="username" label="Username" onChange={handleChange} />
          <TextField
            type="password"
            name="password"
            label="Password"
            onChange={handleChange}
          />
          <Button variant="outlined" color="primary" onClick={login}>
            Login
          </Button>
        </Stack>
      </div>
    );
  }
}

export default Login;
