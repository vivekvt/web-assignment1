import React from 'react';
import Layout from '../component/Layout';
import { Box, Button, Chip, Tab, Tabs, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Layout>
      <Tabs
        // value={value}
        // onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Iphone" />
        <Tab label="Mac" />
        <Tab label="Ipad" />
        <Tab label="Watch" />
        <Tab label="Airpods" />
        <Tab label="Accessories" />
        <Tab label="TV & Home" />
      </Tabs>
      <Box
        sx={{
          bgcolor: '#000000',
          height: 'calc(100vh - 90px)',
          minHeight: '500px',
        }}
        display="flex"
        justifyContent="center"
        textAlign="center"
        alignItems="center"
      >
        <Box>
          <Box sx={{ width: { xs: '300px', sm: '650px' } }}>
            <img src="/apple-vision-pro.png" style={{ width: '100%' }} />
          </Box>
          <Chip label="New" color="success" size="small" />
          <Typography color="Background" variant="h6" sx={{ my: 1 }}>
            Apple Vision Pro
          </Typography>
          <Button variant="contained" size="small">
            Buy Now
          </Button>
        </Box>
      </Box>
      What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the industry's standard dummy
      text ever since the 1500s, when an unknown printer took a galley of type
      and scrambled it to make a type specimen book. It has survived not only
      five centuries, but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with
      desktop publishing software like Aldus PageMaker including versions of
      Lorem Ipsum.
    </Layout>
  );
}
