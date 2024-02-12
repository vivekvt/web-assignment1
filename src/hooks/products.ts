import { useEffect, useState } from 'react';
import { IProduct, products as productsData } from '../data/products';

export const useGetProducts = (category?: string, limit?: number) => {
  const [products, setProduct] = useState<IProduct[] | []>(productsData);

  useEffect(() => {
    let newProducts: any = productsData;
    if (category) {
      newProducts = productsData?.filter((p) =>
        p?.category?.includes(category)
      );
    }
    if (limit) {
      newProducts = newProducts?.slice(0, limit);
    }
    setProduct(newProducts);
  }, [category, limit]);

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
