import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiMoon, FiSearch, FiShoppingBag, FiSun, FiUser, FiX } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import SearchModal from './SearchModal';
import ProfileModal from './ProfileModal';
import CartModal from './CartModal';
import { useCart } from '../../context/CartContext';

interface NavbarProps {
  userRole: string | null;
}

const Navbar = ({ userRole }: NavbarProps) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const isAdmin = userRole === 'admin';
  const { logout } = useAuth();
  const { itemCount } = useCart();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // Define navigation links based on user role
  const navLinks = isAdmin
    ? [] // Empty array for admin
    : [
        { name: 'New Arrivals', href: '/new-arrivals' },
        { name: 'Men', href: '/men' },
        { name: 'Women', href: '/women' },
        { name: 'Collections', href: '/collections' },
        { name: 'Sale', href: '/sale' },
      ];

  return (
    <>
      <nav className={`fixed w-full z-50 ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} transition-colors duration-200`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Left section - Logo and hamburger */}
            <div className="flex items-center space-x-4">
              {!isAdmin && (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden text-gray-800 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <FiX className="text-2xl" />
                  ) : (
                    <FiMenu className="text-2xl" />
                  )}
                </button>
              )}
              <Link to={isAdmin ? '/admin-dashboard' : '/'} className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Sole<span className="font-light">Haven</span>
              </Link>
            </div>

            {/* Middle section - Navigation Links */}
            {!isAdmin && (
              <div className="hidden lg:flex space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-sm uppercase tracking-wider text-gray-800 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Right section - Actions */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3 md:space-x-6">
                <button
                  onClick={toggleDarkMode}
                  className="text-gray-800 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
                </button>
                {!isAdmin && (
                  <>
                    <button
                      onClick={() => setIsSearchOpen(true)}
                      className="text-gray-800 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                      aria-label="Search"
                    >
                      <FiSearch className="text-xl" />
                    </button>
                    <button
                      onClick={() => setIsProfileOpen(true)}
                      className="text-gray-800 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                      aria-label="User account"
                    >
                      <FiUser className="text-xl" />
                    </button>
                    <button
                      onClick={() => setIsCartOpen(true)}
                      className="relative text-gray-800 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                      aria-label="Shopping cart"
                    >
                      <FiShoppingBag className="text-xl" />
                      {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {itemCount}
                        </span>
                      )}
                    </button>
                  </>
                )}
                {isAdmin && (
                  <Link
                    to="/admin-dashboard"
                    className="hidden md:block text-sm uppercase tracking-wider text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="hidden md:block text-sm px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {!isAdmin && isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden mt-4"
              >
                <div className="flex flex-col space-y-4 py-4 border-t border-gray-200 dark:border-gray-700">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-sm uppercase tracking-wider text-gray-800 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  {/* Mobile-only buttons */}
                  {isAdmin && (
                    <Link
                      to="/admin-dashboard"
                      className="md:hidden text-sm uppercase tracking-wider text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="md:hidden text-sm px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors w-full"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;