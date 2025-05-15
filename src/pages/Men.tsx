import { motion } from 'framer-motion';
import { FiArrowRight, FiStar, FiHeart } from 'react-icons/fi';
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

const Men = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Air Force Pro Max",
      category: "Running",
      price: 179.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
      tag: "Bestseller",
      description: "Ultimate cushioning for long-distance runs"
    },
    {
      id: 2,
      name: "Power Trainer Elite",
      category: "Training",
      price: 149.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2071&auto=format&fit=crop",
      tag: "New",
      description: "Versatile training shoe for any workout"
    },
    {
      id: 3,
      name: "Street Legend X",
      category: "Lifestyle",
      price: 139.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=2025&auto=format&fit=crop",
      tag: "Trending",
      description: "Classic style meets modern comfort"
    },
    {
      id: 4,
      name: "Slam Dunk Pro",
      category: "Basketball",
      price: 169.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1974&auto=format&fit=crop",
      tag: "New Release",
      description: "Engineered for explosive jumps"
    },
    {
      id: 5,
      name: "Grand Slam Elite",
      category: "Tennis",
      price: 154.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2000&auto=format&fit=crop",
      tag: "Pro Choice",
      description: "Superior court control and stability"
    },
    {
      id: 6,
      name: "CrossTrain Beast",
      category: "Training",
      price: 144.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=2187&auto=format&fit=crop",
      tag: "High Performance",
      description: "Built for intense cross-training"
    },
    {
      id: 7,
      name: "Court Master Elite",
      category: "Basketball",
      price: 159.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974&auto=format&fit=crop",
      tag: "Court Ready",
      description: "Professional-grade court performance"
    },
    {
      id: 8,
      name: "Serve & Volley Pro",
      category: "Tennis",
      price: 149.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=2031&auto=format&fit=crop",
      tag: "Tournament Choice",
      description: "Designed for quick court movements"
    },
    {
      id: 9,
      name: "Intensity Max",
      category: "Training",
      price: 139.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2071&auto=format&fit=crop",
      tag: "CrossFit Special",
      description: "Maximum stability for intense workouts"
    },
    {
      id: 10,
      name: "Phantom Elite X",
      category: "Limited Edition",
      price: 329.99,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1597248881519-db089d3744a5?q=80&w=2070&auto=format&fit=crop",
      tag: "Exclusive Release",
      description: "Premium limited edition performance"
    },
    {
      id: 11,
      name: "Shadow Runner Pro",
      category: "Limited Edition",
      price: 299.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2012&auto=format&fit=crop",
      tag: "Designer Collection",
      description: "Luxury meets performance"
    },
    {
      id: 12,
      name: "Stealth Force",
      category: "Limited Edition",
      price: 309.99,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2080&auto=format&fit=crop",
      tag: "Luxury Edition",
      description: "Elite performance in style"
    },
    {
      id: 13,
      name: "Sprint Elite Pro",
      category: "Performance",
      price: 189.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=2065&auto=format&fit=crop",
      tag: "Speed Series",
      description: "Engineered for maximum speed"
    },
    {
      id: 14,
      name: "Agility Master X",
      category: "Performance",
      price: 179.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=2079&auto=format&fit=crop",
      tag: "Pro Performance",
      description: "Superior agility and control"
    },
    {
      id: 15,
      name: "Power Boost Pro",
      category: "Performance",
      price: 199.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?q=80&w=2065&auto=format&fit=crop",
      tag: "Energy Series",
      description: "Maximum energy return technology"
    },
    {
      id: 16,
      name: "Ultra Distance X",
      category: "Performance",
      price: 184.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=2025&auto=format&fit=crop",
      tag: "Endurance Pro",
      description: "Built for long-distance comfort"
    }
  ]);

  const categories = [
    "All", "Performance", "Running", "Training", "Lifestyle", "Basketball", "Tennis", "Limited Edition"
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 z-10" />
        <img
          src="https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2067&auto=format&fit=crop"
          alt="Men's Collection"
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
              Men's Collection
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              Discover our premium selection of men's footwear designed for performance and style. 
              From court to street, elevate your game with every step.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
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
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-600 text-white">
                    {product.tag}
                  </span>
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <FiHeart className="w-4 h-4 text-gray-800" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
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
              title: "Performance",
              image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
              description: "Built for speed"
            },
            {
              title: "Training",
              image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=2187&auto=format&fit=crop",
              description: "Push your limits"
            },
            {
              title: "Lifestyle",
              image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=2025&auto=format&fit=crop",
              description: "Street style"
            },
            {
              title: "Limited Edition",
              image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2012&auto=format&fit=crop",
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

export default Men;