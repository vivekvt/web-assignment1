import React, { useRef } from 'react';
import Layout from '../component/Layout';
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import BreadCrumbs from '../component/BreadCrumbs';
import { useSelector } from 'react-redux';
import { ICart, calculateCartTotal, useUpdateCart } from '../hooks/cart';
import { Delete, Edit } from '@mui/icons-material';
import QuantityInput from '../component/QuantityInput';
import { IProfile } from '../hooks/profile';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const auth: any = useSelector((state: any) => state?.user);
  const { removeProduct, changeQuantity } = useUpdateCart();
  const cart: ICart[] = auth?.cart;
  const userProfile: IProfile = auth?.session;

  return (
    <Layout>
      <Container maxWidth="md" sx={{ pb: 2 }}>
        <BreadCrumbs>
          <Typography>Cart</Typography>
        </BreadCrumbs>
        {cart?.length > 0 ? (
          <TableContainer variant="outlined" component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart?.map((cartItem, index) => (
                  <TableRow key={index + 1}>
                    <TableCell>
                      <Typography noWrap>
                        <Link to={`/products/${cartItem?.product?.id}`}>
                          {cartItem?.product?.title}
                        </Link>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <QuantityInput
                        value={cartItem?.quantity}
                        onChange={(newValue) =>
                          changeQuantity(cartItem?.product?.id, newValue)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      ${cartItem?.product?.price * cartItem?.quantity}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => removeProduct(cartItem?.product?.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Total</Typography>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>${calculateCartTotal(cart)}</TableCell>
                  <TableCell>
                    <Button size="small" variant="contained">
                      Checkout
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Box padding={2}>
              <Typography fontWeight="bold">
                Shipping Address
                <Link to="/profile">
                  <Button size="small" startIcon={<Edit />}>
                    Change
                  </Button>
                </Link>
              </Typography>
              <Typography>{userProfile?.address?.addressLine}</Typography>
              <Typography>
                {userProfile?.address?.city}, {userProfile?.address?.zipcode}
              </Typography>
              <Typography>
                {userProfile?.address?.province},{' '}
                {userProfile?.address?.country}
              </Typography>
            </Box>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Typography textAlign="center">No products in cart</Typography>
            <Link to="/products">
              <Button variant="contained" size="small" sx={{ mt: 1 }}>
                Shop Now
              </Button>
            </Link>
          </Box>
        )}
      </Container>
    </Layout>
  );
}
