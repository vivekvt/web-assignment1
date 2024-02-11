export interface IProduct {
  id: string | number;
  title: string;
  description: string;
  price: number;
  tags: string[];
  category: string[];
  stock: number;
  imageUrl: string;
}

export const products: IProduct[] = [
  {
    id: 1,
    title: "Apple Macbook Pro 13'",
    description: "Apple Macbook Pro 13'",
    price: 1699,
    tags: ['macbook', 'apple', 'laptop'],
    category: ['mac'],
    stock: 100,
    imageUrl: '/products/iphone/iphone-15pro.webp',
  },
  {
    id: 2,
    title: 'iPhone 15 Pro',
    description: 'Apple iPhone 15 Pro',
    price: 999,
    tags: ['iphone', 'apple', 'smartphone'],
    category: ['iphone'],
    stock: 50,
    imageUrl: '/products/iphone/iphone-15pro.webp',
  },
  {
    id: 3,
    title: 'Apple Watch Series 8',
    description: 'Apple Watch Series 6',
    price: 399,
    tags: ['watch', 'apple', 'wearable'],
    category: ['watch'],
    stock: 75,
    imageUrl: '/products/iphone/iphone-15pro.webp',
  },
  {
    id: 4,
    title: 'AirPods Pro',
    description: 'Apple AirPods Pro',
    price: 249,
    tags: ['airpods', 'apple', 'audio'],
    category: ['airpods'],
    stock: 150,
    imageUrl: '/products/iphone/iphone-15pro.webp',
  },
  {
    id: 5,
    title: 'Apple TV 4K',
    description: 'Apple TV 4K',
    price: 179,
    tags: ['tv', 'apple', 'streaming'],
    category: ['tv'],
    stock: 200,
    imageUrl: '/products/iphone/iphone-15pro.webp',
  },
  {
    id: 6,
    title: 'Apple Magic Mouse',
    description: 'Apple Magic Mouse',
    price: 79,
    tags: ['accessories', 'apple', 'mouse'],
    category: ['accessories'],
    stock: 50,
    imageUrl: '/products/iphone/iphone-15pro.webp',
  },
  {
    id: 7,
    title: 'iPhone SE (2020)',
    description: 'Apple iPhone SE (2020)',
    price: 399,
    tags: ['iphone', 'apple', 'smartphone'],
    category: ['iphone'],
    stock: 100,
    imageUrl: '/products/iphone/iphone-15pro.webp',
  },
  {
    id: 8,
    title: 'Apple Watch SE',
    description: 'Apple Watch SE',
    price: 279,
    tags: ['watch', 'apple', 'wearable'],
    category: ['watch'],
    stock: 50,
    imageUrl: '/products/iphone/iphone-15pro.webp',
  },
  {
    id: 9,
    title: 'AirPods Max',
    description: 'Apple AirPods Max',
    price: 549,
    tags: ['airpods', 'apple', 'audio'],
    category: ['airpods'],
    stock: 25,
    imageUrl: '/products/iphone/iphone-15pro.webp',
  },
  {
    id: 10,
    title: 'iMac',
    description: 'Apple iMac',
    price: 1299,
    tags: ['imac', 'apple', 'desktop'],
    category: ['mac'],
    stock: 50,
    imageUrl: '/products/iphone/iphone-15pro.webp',
  },
  {
    id: 11,
    title: 'Apple TV HD',
    description: 'Apple TV HD',
    price: 149,
    tags: ['tv', 'apple', 'streaming'],
    category: ['tv'],
    stock: 100,
    imageUrl: '/products/iphone/iphone-15pro.webp',
  },
  {
    id: 12,
    title: 'Apple Pencil (2nd Generation)',
    description: 'Apple Pencil (2nd Generation)',
    price: 129,
    tags: ['accessories', 'apple', 'stylus'],
    category: ['accessories'],
    stock: 75,
    imageUrl: '/products/iphone/iphone-15pro.webp',
  },
];