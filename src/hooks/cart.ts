import { useEffect, useState } from 'react';
import { IProduct } from '../data/products';
import * as localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../redux/store';

export interface ICart {
  product: IProduct;
  quantity: number;
}

export const useAddToCart = (product: IProduct | null) => {
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state?.user?.cart) || [];

  useEffect(() => {
    if (product?.id) {
      const selectedCartItem = cart?.find(
        (cartItem: any) => cartItem?.product?.id == product?.id
      );
      if (selectedCartItem?.product?.id) {
        setAlreadyInCart(true);
      } else {
        setAlreadyInCart(false);
      }
    }
  }, [product?.id, cart]);

  const addToCart = async () => {
    try {
      if (!alreadyInCart) {
        let oldCart: any = [];
        const selectCart: any = await localforage.getItem('cart');
        if (selectCart?.length > 0) {
          oldCart = selectCart;
        }
        const newCart = [...(oldCart || []), { product, quantity }];
        await localforage.setItem('cart', newCart);
        dispatch(updateCart(newCart));
      }
    } catch (error: any) {
      alert(`error ${error.message}`);
    }
  };

  return { alreadyInCart, addToCart, quantity, setQuantity };
};

export const useUpdateCart = () => {
  const dispatch = useDispatch();
  const cart: ICart[] = useSelector((state: any) => state?.user?.cart) || [];

  const saveCart = async (newCart: any) => {
    try {
      await localforage.setItem('cart', newCart);
      dispatch(updateCart(newCart));
    } catch (error: any) {
      alert(`error ${error.message}`);
    }
  };

  const changeQuantity = async (productId: string, newQuantity: number) => {
    try {
      const newCart = cart?.map((cartItem) =>
        cartItem?.product?.id == productId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      );
      await saveCart(newCart);
    } catch (error: any) {
      alert(`error ${error.message}`);
    }
  };

  const removeProduct = async (productId: string) => {
    try {
      const newCart = cart?.filter(
        (cartItem) => cartItem?.product?.id != productId
      );
      await saveCart(newCart);
    } catch (error: any) {
      alert(`error ${error.message}`);
    }
  };
  return { changeQuantity, removeProduct };
};

export const calculateCartTotal = (cart: ICart[]) => {
  let total = 0;
  cart?.forEach((cartItem) => {
    total += cartItem?.product?.price * cartItem?.quantity;
  });
  return total;
};
