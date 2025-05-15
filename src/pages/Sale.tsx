import { motion } from 'framer-motion';
import { FiArrowRight, FiStar, FiHeart, FiClock } from 'react-icons/fi';
import { useState } from 'react';
import AddToCartButton from '../components/ui/AddToCartButton';

interface Product {
  id: number;
  name: string;
  category: string;
  originalPrice: number;
  salePrice: number;
  rating: number;
  image: string;
  tag: string;
  discountType: string;
  discountPercent: number;
  description: string;
  endTime?: string;
}

const Sale = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Ultra Boost X",
      category: "Running",
      originalPrice: 199.99,
      salePrice: 139.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
      tag: "Flash Sale",
      discountType: "Limited Time",
      discountPercent: 30,
      description: "Premium running shoes with responsive cushioning",
      endTime: "2024-04-01"
    },
    {
      id: 2,
      name: "Air Max Elite",
      category: "Lifestyle",
      originalPrice: 179.99,
      salePrice: 89.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=2025&auto=format&fit=crop",
      tag: "Clearance",
      discountType: "Half Price",
      discountPercent: 50,
      description: "Classic style with modern comfort"
    },
    {
      id: 3,
      name: "Court Vision Pro",
      category: "Basketball",
      originalPrice: 159.99,
      salePrice: 111.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974&auto=format&fit=crop",
      tag: "Member Deal",
      discountType: "Member Exclusive",
      discountPercent: 30,
      description: "Professional basketball shoes with enhanced grip"
    },
    {
      id: 4,
      name: "CrossFit Dominator",
      category: "Training",
      originalPrice: 149.99,
      salePrice: 104.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=2187&auto=format&fit=crop",
      tag: "Special Offer",
      discountType: "Bundle Deal",
      discountPercent: 30,
      description: "Get 30% off when buying 2 pairs"
    },
    {
      id: 5,
      name: "Tennis Ace Pro",
      category: "Tennis",
      originalPrice: 169.99,
      salePrice: 118.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=2031&auto=format&fit=crop",
      tag: "Season End",
      discountType: "Clearance",
      discountPercent: 30,
      description: "Professional tennis shoes at clearance price"
    },
    {
      id: 6,
      name: "Limited Runner X",
      category: "Limited Edition",
      originalPrice: 299.99,
      salePrice: 179.99,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1597248881519-db089d3744a5?q=80&w=2070&auto=format&fit=crop",
      tag: "Exclusive Deal",
      discountType: "VIP Access",
      discountPercent: 40,
      description: "Limited edition with special discount",
      endTime: "2024-03-25"
    }
  ]);

  const categories = [
    "All", "Running", "Training", "Basketball", "Tennis", "Limited Edition"
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
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 to-orange-900/90 z-10" />
        <img
          src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2071&auto=format&fit=crop"
          alt="Sale Banner"
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
              Mega Sale Event
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              Discover incredible deals on premium footwear. 
              Limited time offers with up to 50% off on selected items.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white'
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

      {/* Products Grid */}
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
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-red-600 text-white">
                    {product.tag}
                  </span>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-orange-600 text-white">
                    {product.discountPercent}% OFF
                  </span>
                </div>
                {product.endTime && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-black/70 text-white">
                    <FiClock className="w-4 h-4" />
                    <span>Limited Time</span>
                  </div>
                )}
                <button className="absolute bottom-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <FiHeart className="w-4 h-4 text-gray-800" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
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
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-red-600 dark:text-red-400">
                      ${product.salePrice}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <AddToCartButton
                    product={{
                      id: product.id.toString(),
                      name: product.name,
                      price: product.originalPrice,
                      image: product.image,
                      salePrice: product.salePrice,
                    }}
                    className="!p-2 !rounded-full"
                    showIcon={true}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Sale; 