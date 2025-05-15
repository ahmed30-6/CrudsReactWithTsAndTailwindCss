import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { useWishlist } from '../../context/WishlistContext';
import { Product } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface WishlistButtonProps {
  product: Product;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  product,
  className = '',
  size = 'md',
  variant = 'default'
}) => {
  const { isLoggedIn } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3'
  };

  const variantClasses = {
    default: `bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 
      dark:bg-gray-800/90 dark:hover:bg-gray-800 dark:text-white`,
    outline: `border-2 border-gray-200 dark:border-gray-700 hover:border-red-500 
      dark:hover:border-red-500 text-gray-800 dark:text-white`,
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white'
  };

  const isWishlisted = isInWishlist(product.id);

  return (
    <button
      onClick={handleClick}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${isWishlisted ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'}
        rounded-lg transition-all duration-200
        ${className}
      `}
      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
    >
      <FiHeart
        className={`${
          size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'
        } ${isWishlisted ? 'fill-current' : ''}`}
      />
    </button>
  );
};

export default WishlistButton; 