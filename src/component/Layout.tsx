import React, { ReactNode } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import { Box } from '@mui/material';
import { useAuth } from '../hooks/authHook';

interface ILayout {
  children: ReactNode;
}

export default function Layout({ children }: ILayout) {
  useAuth();
  return (
    <div>
      <Navbar />
      <Box sx={{ minHeight: '80vh' }}>{children}</Box>
      <Footer />
    </div>
  );
}
