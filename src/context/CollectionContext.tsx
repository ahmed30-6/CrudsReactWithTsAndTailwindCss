import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export interface Collection {
  id: number;
  name: string;
  description: string;
  image: string;
  items: number;
  featured: boolean;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface CollectionContextType {
  collections: Collection[];
  wishlist: number[];
  addToWishlist: (collectionId: number) => void;
  removeFromWishlist: (collectionId: number) => void;
  isInWishlist: (collectionId: number) => boolean;
  getCollection: (id: number) => Collection | undefined;
  loading: boolean;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const useCollections = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollections must be used within a CollectionProvider');
  }
  return context;
};

export const CollectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: 1,
      name: "Summer Essentials",
      description: "Light and breathable footwear for the summer season",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1925&auto=format&fit=crop",
      items: 24,
      featured: true,
      products: [
        {
          id: 101,
          name: "Summer Breeze Sneaker",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
          description: "Lightweight and breathable sneaker perfect for summer days",
          category: "Sneakers"
        },
        {
          id: 102,
          name: "Beach Walker Sandal",
          price: 59.99,
          image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
          description: "Comfortable sandals for beach walks",
          category: "Sandals"
        }
      ]
    },
    {
      id: 2,
      name: "Athletic Pro",
      description: "Professional grade sports footwear for athletes",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2000&auto=format&fit=crop",
      items: 18,
      featured: false,
      products: [
        {
          id: 201,
          name: "Sprint Elite Runner",
          price: 129.99,
          image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
          description: "High-performance running shoes for professional athletes",
          category: "Running"
        }
      ]
    },
    {
      id: 3,
      name: "Urban Style",
      description: "Street-ready sneakers for the modern lifestyle",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
      items: 32,
      featured: false,
      products: [
        {
          id: 301,
          name: "City Cruiser",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
          description: "Stylish urban sneakers for daily wear",
          category: "Sneakers"
        }
      ]
    },
    {
      id: 4,
      name: "Classic Edition",
      description: "Timeless designs that never go out of style",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop",
      items: 16,
      featured: false,
      products: [
        {
          id: 401,
          name: "Vintage Classic",
          price: 79.99,
          image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
          description: "Classic design with modern comfort",
          category: "Casual"
        }
      ]
    }
  ]);

  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (collectionId: number) => {
    setWishlist(prev => {
      if (!prev.includes(collectionId)) {
        toast.success('Added to wishlist');
        return [...prev, collectionId];
      }
      return prev;
    });
  };

  const removeFromWishlist = (collectionId: number) => {
    setWishlist(prev => {
      const newWishlist = prev.filter(id => id !== collectionId);
      toast.success('Removed from wishlist');
      return newWishlist;
    });
  };

  const isInWishlist = (collectionId: number) => {
    return wishlist.includes(collectionId);
  };

  const getCollection = (id: number) => {
    return collections.find(collection => collection.id === id);
  };

  return (
    <CollectionContext.Provider
      value={{
        collections,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getCollection,
        loading
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}; 