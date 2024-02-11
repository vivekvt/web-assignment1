import * as localforage from 'localforage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSession } from '../redux/store';

export const useAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    localforage.getItem('authSession').then(function (value: any) {
      if (value?.email) {
        dispatch(setSession(value));
      }
    });
  }, []);
};
