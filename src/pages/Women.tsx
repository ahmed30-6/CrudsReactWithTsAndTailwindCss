import { motion } from 'framer-motion';
import { FiStar, FiHeart } from 'react-icons/fi';
import { useState } from 'react';
import AddToCartButton from '../components/ui/AddToCartButton';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  tag: string;
  size?: string;
  description?: string;
  inStock?: boolean;
  colors?: string[];
}

const Women = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Cloud Stratus Elite",
      category: "Running",
      price: 169.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=2079&auto=format&fit=crop",
      tag: "Bestseller"
    },
    {
      id: 2,
      name: "Flex Motion Pro",
      category: "Training",
      price: 139.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2071&auto=format&fit=crop",
      tag: "New"
    },
    {
      id: 3,
      name: "Urban Street Classic",
      category: "Lifestyle",
      price: 129.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1465479423260-c4afc24172c6?q=80&w=2071&auto=format&fit=crop",
      tag: "Trending"
    },
    {
      id: 4,
      name: "Court Dominator Pro",
      category: "Basketball",
      price: 159.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2000&auto=format&fit=crop",
      tag: "New Release"
    },
    {
      id: 5,
      name: "Match Point Elite",
      category: "Tennis",
      price: 144.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
      tag: "Pro Choice"
    },
    {
      id: 6,
      name: "HIIT Trainer X",
      category: "Training",
      price: 134.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2071&auto=format&fit=crop",
      tag: "High Performance"
    },
    {
      id: 7,
      name: "Court Vision Elite",
      category: "Basketball",
      price: 149.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=2025&auto=format&fit=crop",
      tag: "Court Ready"
    },
    {
      id: 8,
      name: "Ace Performer",
      category: "Tennis",
      price: 139.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=2187&auto=format&fit=crop",
      tag: "Tournament Choice"
    },
    {
      id: 9,
      name: "CrossFit Warrior",
      category: "Training",
      price: 129.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2187&auto=format&fit=crop",
      tag: "CrossFit Special"
    },
    {
      id: 10,
      name: "Aurora Luminous",
      category: "Limited Edition",
      price: 299.99,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1597248881519-db089d3744a5?q=80&w=2070&auto=format&fit=crop",
      tag: "Exclusive Release"
    },
    {
      id: 11,
      name: "Crystal Runner X",
      category: "Limited Edition",
      price: 279.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2012&auto=format&fit=crop",
      tag: "Designer Collection"
    },
    {
      id: 12,
      name: "Midnight Sparkle",
      category: "Limited Edition",
      price: 289.99,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974&auto=format&fit=crop",
      tag: "Luxury Edition"
    }
  ]);

  const categories = [
    "All", "Running", "Training", "Lifestyle", "Basketball", "Tennis", "Limited Edition"
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter(product =>
    selectedCategory === "All" || product.category === selectedCategory
  );

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
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-indigo-900/90 z-10" />
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
          alt="Women's Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Women's Collection
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              Discover our curated selection of premium footwear designed for the modern woman.
              Comfort meets style in every step.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  } backdrop-blur-sm transition-colors`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-600 text-white">
                    {product.tag}
                  </span>
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <FiHeart className="w-4 h-4 text-gray-800" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
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

        {/* Collection Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              title: "Running",
              image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?q=80&w=2070&auto=format&fit=crop",
              description: "Performance meets style"
            },
            {
              title: "Training",
              image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2187&auto=format&fit=crop",
              description: "Built for your workout"
            },
            {
              title: "Lifestyle",
              image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=2164&auto=format&fit=crop",
              description: "Everyday comfort"
            },
            {
              title: "Limited Edition",
              image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2187&auto=format&fit=crop",
              description: "Exclusive designs"
            }
          ].map((category) => (
            <div
              key={category.title}
              onClick={() => setSelectedCategory(category.title)}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl font-bold text-white mb-1">
                  {category.title}
                </h3>
                <p className="text-gray-200 text-sm">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Women;