import * as localforage from 'localforage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from '../redux/store';

export interface IProfile {
  name: string;
  email: string;
  address: IAddress;
}
interface IAddress {
  addressLine: string;
  city: string;
  zipcode: string;
  province: string;
  country: string;
}

export const useUpdateProfile = () => {
  const user = useSelector((state: any) => state?.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<IProfile>({
    name: '',
    email: '',
    address: {
      addressLine: '112 King St',
      city: 'Kitchener',
      zipcode: 'N2G3N8',
      province: 'Ontario',
      country: 'Canada',
    },
  });

  useEffect(() => {
    if (user?.session) {
      setProfile(user?.session);
    }
  }, [user?.session]);

  console.log({ user });

  const onChange = (event: any) => {
    const { name, value } = event?.target;
    setProfile((oldProfile) => ({ ...oldProfile, [name]: value }));
  };

  const onAddressChange = (event: any) => {
    const { name, value } = event?.target;
    setProfile((oldProfile) => ({
      ...oldProfile,
      address: { ...oldProfile?.address, [name]: value },
    }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const users: any = await localforage.getItem('users');
      const newUsers = users?.map((user: any) =>
        user?.email == profile?.email ? profile : user
      );
      await localforage.setItem('users', newUsers);
      await localforage.setItem('authSession', profile);
      dispatch(setSession(profile));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      alert(`Error ${error.message}`);
    }
  };

  return { loading, onChange, profile, onAddressChange, onSubmit };
};
