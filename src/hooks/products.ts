import { useEffect, useState } from 'react';
import { IProduct, products as productsData } from '../data/products';

export const useGetProducts = (category?: string) => {
  const [products, setProduct] = useState<IProduct[] | []>(productsData);

  useEffect(() => {
    if (category) {
      let newProducts: any = productsData.find((p) =>
        p.category.includes(category)
      );
      setProduct(newProducts);
    }
  }, [category]);

  return products;
};

export const useGetProductById = (id?: string) => {
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    if (id) {
      let selectedProduct: any = productsData.find((p) => p.id == id);
      setProduct(selectedProduct);
    }
  }, [id]);

  return product;
};
