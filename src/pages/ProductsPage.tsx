import React from 'react';
import Layout from '../component/Layout';
import { useGetProducts } from '../hooks/products';
import { Box, Card, Container, Grid, Typography } from '@mui/material';
import BreadCrumbs from '../component/BreadCrumbs';
import { Link } from 'react-router-dom';

export default function ProductsPage() {
  const products = useGetProducts();
  return (
    <Layout>
      <Container sx={{ pb: 2 }} maxWidth="md">
        <BreadCrumbs>
          <Typography>Products</Typography>
        </BreadCrumbs>
        <Grid container spacing={2}>
          {products?.map((product, index) => (
            <Grid xs={6} sm={4} md={3} key={index} item>
              <Link to={`/products/${product?.id}`}>
                <Card variant="outlined" sx={{ px: 2, pt: 2, pb: 1 }}>
                  <Box>
                    <img src={product?.imageUrl} style={{ width: '100%' }} />
                  </Box>
                  <Typography textAlign="center" noWrap>
                    {product?.title}
                  </Typography>
                  <Typography textAlign="center" noWrap>
                    <Typography variant="caption" display="inline">
                      <del>
                        $
                        {Number(product?.price) +
                          Number((product?.price * 0.1).toFixed())}
                      </del>
                    </Typography>
                    <Typography
                      mx={1}
                      display="inline"
                      fontWeight="bold"
                      color="green"
                    >
                      ${product?.price}
                    </Typography>
                    <Typography variant="caption" display="inline">
                      -10%
                    </Typography>
                  </Typography>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
}
