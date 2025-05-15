import { motion, AnimatePresence } from 'framer-motion';
import "../../styles/Button.css"
import Slider from './Slider';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const heroTexts = [
    { top: "Elevate Your", bottom: "Perfect Stride" },
    { top: "Step Into", bottom: "Your Style" },
    { top: "Discover Your", bottom: "Signature Move" },
    { top: "Walk With", bottom: "Confidence" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleShopCollection = () => {
    navigate('/collections');
  };

  const handleExploreMore = () => {
    setIsExploreOpen(true);
  };

  const categories = [
    { name: "Men's Collection", path: '/men', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2067&auto=format&fit=crop' },
    { name: "Women's Collection", path: '/women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop' },
    { name: 'New Arrivals', path: '/new-arrivals', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=2025&auto=format&fit=crop' },
    { name: 'Sale', path: '/sale', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2071&auto=format&fit=crop' },
  ];

  return (
    <div className={`relative ${isDarkMode ? 'bg-gray-900' : 'bg-white'} min-h-screen overflow-x-hidden transition-colors duration-200 pt-24`}>
      {/* Hero Content with Slider */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:order-1 space-y-6"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-sm uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text font-semibold"
            >
              New Collection 2024
            </motion.span>
            <div className="h-[160px] md:h-[200px]"> {/* Fixed height container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTextIndex}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                >
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight text-gray-800 dark:text-white">
                    {heroTexts[currentTextIndex].top}
                    <motion.span
                      className="block mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 10
                      }}
                    >
                      {heroTexts[currentTextIndex].bottom}
                    </motion.span>
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-lg mt-6"
            >
              Where luxury meets performance. Experience footwear that transforms
              every step into a statement of style and comfort.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 sm:space-x-6 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShopCollection}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-sm uppercase tracking-wider font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-shadow"
              >
                Shop Collection
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExploreMore}
                className="px-8 py-4 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white rounded-full text-sm uppercase tracking-wider font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Explore More
              </motion.button>
            </motion.div>
          </motion.div>

          <div className="w-full lg:order-2 mt-12 lg:mt-0">
            <Slider />
          </div>
        </div>
      </div>

      {/* Explore More Modal */}
      {isExploreOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsExploreOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-4xl"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              Explore Our Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <motion.div
                  key={category.path}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group cursor-pointer relative overflow-hidden rounded-xl"
                  onClick={() => {
                    setIsExploreOpen(false);
                    navigate(category.path);
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">{category.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Background Effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full filter blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute -top-48 -left-48 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full filter blur-3xl"
      />
    </div>
  );
};

export default HeroSection;