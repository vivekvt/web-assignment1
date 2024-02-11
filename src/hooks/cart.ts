import { useEffect, useState } from 'react';
import { IProduct } from '../data/products';
import * as localforage from 'localforage';

export interface ICart {
  product: IProduct;
  quantity: number;
}

export const useAddToCart = (product: IProduct) => {
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    localforage.getItem('cart').then((cartItems: any) => {
      const selectedCartItem = cartItems?.find(
        (cartItem: any) => cartItem?.product?.id == product?.id
      );
      if (selectedCartItem?.product?.id) {
        setAlreadyInCart(true);
      } else {
        setAlreadyInCart(false);
      }
    });
  }, [product?.id]);

  const addToCart = async () => {
    try {
      if (!alreadyInCart) {
        localforage.getItem('cart');
      }
    } catch (error: any) {
      alert(`error ${error.message}`);
    }
  };

  return { alreadyInCart, addToCart };
};
