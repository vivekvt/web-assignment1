import { Button, TextField } from '@mui/material';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import InputGroup from '../InputGroup';
import { useNavigate } from 'react-router-dom';
import * as localforage from 'localforage';

const initialState = { email: '', password: '' };

export default function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((oldState) => ({ ...oldState, [name]: value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    localforage
      .setItem('authSession', { email: state.email })
      .then(function (value) {
        setState(initialState);
        navigate('/');
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <InputGroup>
        <TextField
          size="small"
          fullWidth
          label="Email"
          required
          type="email"
          name="email"
          value={state.email}
          onChange={onChange}
        />
      </InputGroup>
      <InputGroup>
        <TextField
          size="small"
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={state.password}
          onChange={onChange}
          required
        />
      </InputGroup>
      <InputGroup>
        <Button variant="contained" fullWidth type="submit" disabled={loading}>
          Login
        </Button>
      </InputGroup>
    </form>
  );
}
