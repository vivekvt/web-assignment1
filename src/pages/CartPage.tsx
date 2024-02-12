import React, { useState } from 'react';
import Layout from '../component/Layout';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { useDispatch, useSelector } from 'react-redux';
import { ICart, calculateCartTotal, useUpdateCart } from '../hooks/cart';
import { Delete, Edit } from '@mui/icons-material';
import QuantityInput from '../component/QuantityInput';
import { IProfile } from '../hooks/profile';
import { Link } from 'react-router-dom';
import * as localforage from 'localforage';
import { updateCart } from '../redux/store';

export default function CartPage() {
  const auth: any = useSelector((state: any) => state?.user);
  const [modal, setModal] = useState(false);
  const { removeProduct, changeQuantity } = useUpdateCart();
  const cart: ICart[] = auth?.cart;
  const userProfile: IProfile = auth?.session;
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    await localforage.removeItem('cart');
    dispatch(updateCart([]));
    setModal(true);
  };

  return (
    <Layout authRequired>
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
                    <Button
                      size="small"
                      variant="contained"
                      onClick={handleCheckout}
                    >
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
        <Dialog
          open={modal}
          onClose={() => setModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Your order has been placed successfully
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You will receive order confirmation shortly on your email
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModal(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
}
