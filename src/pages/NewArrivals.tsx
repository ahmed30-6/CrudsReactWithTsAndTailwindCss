import { motion } from 'framer-motion';
import {  FiStar, FiHeart, FiShoppingBag, FiFilter, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddToCartButton from '../components/ui/AddToCartButton';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  tag: string;
  releaseDate: string;
}

interface FilterState {
  minPrice: number;
  maxPrice: number;
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating';
}

const NewArrivals = () => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [email, setEmail] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'newest'
  });

  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Ultra Boost 2024",
      category: "Running",
      price: 179.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=2131&auto=format&fit=crop",
      tag: "New Release",
      releaseDate: "Just Released"
    },
    {
      id: 2,
      name: "Air Max Pulse",
      category: "Lifestyle",
      price: 159.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=2187&auto=format&fit=crop",
      tag: "Trending",
      releaseDate: "2 days ago"
    },
    {
      id: 3,
      name: "Cloud Runner",
      category: "Performance",
      price: 149.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974&auto=format&fit=crop",
      tag: "Limited Edition",
      releaseDate: "1 week ago"
    }
  ]);

  const handleWishlist = (product: Product) => {
    if (isInWishlist(product.id.toString())) {
      removeFromWishlist(product.id.toString());
    } else {
      addToWishlist({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }
    toast.success('Thank you for subscribing!');
    setEmail('');
  };

  const handleShopCollection = () => {
    navigate('/collections');
  };

  const handleViewCatalog = () => {
    const element = document.getElementById('products-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredAndSortedProducts = [...products]
    .filter(product =>
      product.price >= filters.minPrice &&
      product.price <= filters.maxPrice
    )
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-teal-900/90 z-10" />
        <img
          src="https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2067&auto=format&fit=crop"
          alt="New Arrivals"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1 bg-emerald-500 text-white rounded-full text-sm font-medium mb-6">
              Latest Drops
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              New Arrivals
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-xl">
              Be the first to experience our latest releases. Premium footwear crafted for
              performance and style.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleShopCollection}
                className="px-8 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Shop Collection
              </button>
              <button
                onClick={handleViewCatalog}
                className="px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 backdrop-blur-sm transition-colors"
              >
                View Catalog
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <FiFilter />
            <span>Filters</span>
          </button>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
            className="px-4 py-2 bg-white  rounded-lg shadow-sm hover:shadow-md transition-all outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Price Range</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <FiX />
              </button>
            </div>
            <div className="flex gap-4">
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                className="w-24 px-3 py-2 border rounded-lg"
                placeholder="Min"
              />
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-24 px-3 py-2 border rounded-lg"
                placeholder="Max"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Featured Products */}
      <div id="products-section" className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredAndSortedProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500 text-white">
                    {product.tag}
                  </span>
                </div>
                <button
                  onClick={() => handleWishlist(product)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <FiHeart
                    className={`w-4 h-4 ${
                      isInWishlist(product.id.toString())
                        ? 'text-red-500 fill-current'
                        : 'text-gray-800'
                    }`}
                  />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-black/50 backdrop-blur-sm rounded-lg text-white text-sm">
                    <FiShoppingBag className="w-4 h-4" />
                    <span>{product.releaseDate}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {product.category}
                  </span>
                  <div className="flex items-center">
                    <FiStar className="w-4 h-4 text-yellow-500" />
                    <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-800 dark:text-white">
                    ${product.price}
                  </span>
                  <AddToCartButton
                    product={{
                      id: product.id.toString(),
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    }}
                    className="!p-2 !rounded-full"
                    showIcon={true}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 md:p-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Stay Ahead of the Game
            </h2>
            <p className="text-emerald-100 mb-8">
              Subscribe to get early access to new releases and exclusive member benefits.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border-2 border-transparent focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300 outline-none transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NewArrivals;