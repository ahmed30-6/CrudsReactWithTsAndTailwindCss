import { motion } from 'framer-motion';
import { FiMenu, FiSearch, FiShoppingBag, FiUser } from 'react-icons/fi';
import "../../styles/Button.css"
const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="md:hidden">  
            <FiMenu className="text-2xl" />
          </button>
          <h1 className="text-2xl font-bold">Sole<span className="text-indigo-400">Haven</span></h1>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-indigo-300 transition">New Arrivals</a>
          <a href="#" className="hover:text-indigo-300 transition">Men</a>
          <a href="#" className="hover:text-indigo-300 transition">Women</a>
          <a href="#" className="hover:text-indigo-300 transition">Collections</a>
          <a href="#" className="hover:text-indigo-300 transition">Sale</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <button>
            <FiSearch className="text-xl" />
          </button>
          <button>
            <FiUser className="text-xl" />
          </button>
          <button className="relative">
            <FiShoppingBag className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-indigo-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center pt-16 pb-32">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo-400 font-semibold">New Collection</span>
            <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
              Step Into <span className="text-indigo-400">Comfort</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              Discover our premium footwear collection designed for style and performance. 
              Limited edition styles available now.
            </p>
            
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="submitButton bg-blue-600"
              >
                Shop Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                 className="submitButton border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg font-medium transition"
              >
                Explore
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="md:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <img 
              src="https://dms.deckers.com/image/upload/q_auto:eco/wyli-bondi-7-m_2x.png" 
              alt="Premium Sneakers" 
              className="w-full max-w-md mx-auto rounded-lg shadow-2xl rotate-6 transform"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl opacity-20"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute -top-20 -left-20 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl opacity-20"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;