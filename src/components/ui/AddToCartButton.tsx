import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiCheck } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    salePrice?: number;
  };
  size?: string;
  className?: string;
  showIcon?: boolean;
}

const AddToCartButton = ({ product, size, className = '', showIcon = true }: AddToCartButtonProps) => {
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, items } = useCart();

  const handleAddToCart = () => {
    const existingItem = items.find(item => item.id === product.id);
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      salePrice: product.salePrice,
    });

    if (existingItem) {
      toast.success(`Increased ${product.name} quantity to ${existingItem.quantity + 1}`);
    } else {
      toast.success(`${product.name} added to cart`);
    }

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleAddToCart}
      className={`flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 ${className}`}
    >
      {showIcon && (
        <span className="flex items-center justify-center w-5 h-5">
          {isAdded ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <FiCheck className="w-5 h-5" />
            </motion.span>
          ) : (
            <FiShoppingBag className="w-5 h-5" />
          )}
        </span>
      )}
      <span>{isAdded ? 'Added to Cart' : 'Add to Cart'}</span>
    </motion.button>
  );
};

export default AddToCartButton; 