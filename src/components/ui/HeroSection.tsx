import { motion } from 'framer-motion';
import { FiMenu, FiSearch, FiShoppingBag, FiUser } from 'react-icons/fi';
import "../../styles/Button.css"
import Slider from './Slider';

const HeroSection = () => {
  return (
    <div className="relative bg-[#0f172a] text-white min-h-screen md:overflow-y-hidden overflow-x-hidden">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center space-x-4">
          <button className="md:hidden hover:text-indigo-400 transition-colors">
            <FiMenu className="text-2xl" />
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            Sole<span className="font-light">Haven</span>
          </h1>
        </div>

        <div className="hidden md:flex space-x-12">
          <a href="#" className="text-sm uppercase tracking-wider hover:text-indigo-400 transition-colors">New Arrivals</a>
          <a href="#" className="text-sm uppercase tracking-wider hover:text-indigo-400 transition-colors">Men</a>
          <a href="#" className="text-sm uppercase tracking-wider hover:text-indigo-400 transition-colors">Women</a>
          <a href="#" className="text-sm uppercase tracking-wider hover:text-indigo-400 transition-colors">Collections</a>
          <a href="#" className="text-sm uppercase tracking-wider hover:text-indigo-400 transition-colors">Sale</a>
        </div>

        <div className="flex items-center space-x-6">
          <button className="hover:text-indigo-400 transition-colors">
            <FiSearch className="text-xl" />
          </button>
          <button className="hover:text-indigo-400 transition-colors">
            <FiUser className="text-xl" />
          </button>
          <button className="relative hover:text-indigo-400 transition-colors">
            <FiShoppingBag className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </button>
        </div>
      </nav>

      {/* Hero Content with Slider */}
      <div className="container mx-auto px-6 lg:py-3 md:py-12 py-12">
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
              className="inline-block text-sm uppercase tracking-wider bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text font-semibold"
            >
              New Collection 2024
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              Step Into
              <span className="block mt-2 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                Your Style
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 text-lg md:text-xl max-w-lg"
            >
              Discover our premium footwear collection designed for style and performance.
              Limited edition styles available now.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex space-x-6 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-sm uppercase tracking-wider font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-shadow"
              >
                Shop Collection
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-white/20 rounded-full text-sm uppercase tracking-wider font-medium hover:bg-white/10 transition-colors"
              >
                Explore More
              </motion.button>
            </motion.div>
          </motion.div>

          <div className="w-full lg:order-2 mt-12 lg:mt-0 ">
            <Slider />
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full filter blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute -top-48 -left-48 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full filter blur-3xl"
      />
    </div>
  );
};

export default HeroSection;