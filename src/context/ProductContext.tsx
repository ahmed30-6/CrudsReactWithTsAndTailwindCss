import { createContext, useContext, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  gender: string;
  sizes: string[];
  images: string[];
  onSale: boolean;
  salePrice?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Nike Air Max 270',
      price: 149.99,
      description: 'The Nike Air Max 270 delivers visible cushioning under every step.',
      category: 'sneakers',
      gender: 'unisex',
      sizes: ['US 8', 'US 9', 'US 10'],
      images: ['https://images.unsplash.com/photo-1600185365483-26d7a4cc7519'],
      onSale: true,
      salePrice: 129.99,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setProducts(prev => [...prev, newProduct]);
    toast.success('Product added successfully');
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(prev => prev.map(product => {
      if (product.id === id) {
        return {
          ...product,
          ...productData,
          updatedAt: new Date()
        };
      }
      return product;
    }));
    toast.success('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    toast.success('Product deleted successfully');
  };

  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext; 