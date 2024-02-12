import * as localforage from 'localforage';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSession, updateCart } from '../redux/store';

export const useAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    localforage.getItem('authSession').then(function (value: any) {
      if (value?.email) {
        dispatch(setSession(value));
        localforage.getItem('cart').then((cartItems: any) => {
          if (cartItems?.length > 0) {
            dispatch(updateCart(cartItems));
          }
        });
      }
    });
  }, []);
};

const initialLoginState = { email: '', password: '' };
export const useLogin = (onSuccess?: () => void) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialLoginState);
  const [loading, setLoading] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((oldState) => ({ ...oldState, [name]: value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    localforage.getItem('users').then((users: any) => {
      const user = users?.find((user: any) => user.email === state.email);
      if (user?.email) {
        localforage.setItem('authSession', user).then(function (value) {
          setState(initialLoginState);
          dispatch(setSession(value));
          if (onSuccess) {
            onSuccess();
          }
        });
      } else {
        alert('No user found with this email, please signup');
      }
    });
  };
  return { onSubmit, onChange, state, loading };
};

const initialSignUpState = {
  name: '',
  email: '',
  password: '',
  address: {
    addressLine: '112 King St',
    city: 'Kitchener',
    zipcode: 'N2G3N8',
    province: 'Ontario',
    country: 'Canada',
  },
};
export const useSignUp = (onSuccess?: () => void) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialSignUpState);
  const [loading, setLoading] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((oldState) => ({ ...oldState, [name]: value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    localforage.getItem('users').then((users: any) => {
      const user = users?.find((user: any) => user.email === state.email);
      if (user?.email) {
        alert('User with is email already exists, Please login');
      } else {
        const newUsers = [...(users || []), state];
        localforage.setItem('users', newUsers).then(function (value) {
          dispatch(setSession(state));
          setState(initialSignUpState);
          if (onSuccess) {
            onSuccess();
          }
        });
      }
    });
  };
  return { onSubmit, onChange, state, loading };
};
