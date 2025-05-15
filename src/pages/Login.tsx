/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return false;
    }

    if (!formData.username.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      const success = await login(formData.username, formData.password);

      if (success) {
        const isAdmin = formData.username === 'admin@solehaven.com';
        toast.success(`Welcome back, ${isAdmin ? 'Administrator' : 'Valued Customer'}!`);
        navigate(isAdmin ? '/admin-dashboard' : '/');
      } else {
        setError('Invalid email or password');
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      toast.error('Login failed. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg"
      >
        <div className="space-y-4">
          <h2 className="text-center text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Welcome to SoleHaven
          </h2>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Please sign in to continue
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="email"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-3 py-2.5 sm:py-3 pl-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:focus:ring-indigo-400 text-sm sm:text-base"
                  placeholder="Enter your email"
                  disabled={authLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-3 py-2.5 sm:py-3 pl-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:focus:ring-indigo-400 text-sm sm:text-base"
                  placeholder="Enter your password"
                  disabled={authLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={authLoading}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-500 text-center bg-red-100 dark:bg-red-900/30 p-2 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          <div>
            <button
              type="submit"
              disabled={authLoading}
              className={`group relative w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-lg text-sm sm:text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                authLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {authLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="mt-8 space-y-4">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
              Demo Credentials
            </p>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-4">
              <div className="space-y-1">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                  Administrator:
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Email: admin@solehaven.com
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Password: Admin@123
                </p>
              </div>
              <div className="pt-3 border-t border-gray-200 dark:border-gray-600 space-y-1">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                  Customer:
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Email: customer@solehaven.com
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Password: Customer@123
                </p>
              </div>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;