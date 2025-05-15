import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiTag, FiPackage, FiUsers, FiSettings, FiLogOut, FiMenu, FiX, FiHome, FiBell, FiMail, FiPhone, FiLock } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useProducts, Product } from '../context/ProductContext';
import toast from 'react-hot-toast';
import AddProductModal from '../components/admin/AddProductModal';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  joinDate: string;
  phone?: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { userEmail, logout } = useAuth();
  const { products, deleteProduct, updateProduct } = useProducts();
  const [activeTab, setActiveTab] = useState('products');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add this mock data for users (in a real app, this would come from your backend)
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-02-20 10:30 AM',
      joinDate: '2023-12-01',
      phone: '+1 234-567-8900'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'manager',
      status: 'active',
      lastLogin: '2024-02-19 03:45 PM',
      joinDate: '2024-01-15',
      phone: '+1 234-567-8901'
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      role: 'user',
      status: 'inactive',
      lastLogin: '2024-02-15 09:20 AM',
      joinDate: '2024-02-01'
    },
    {
      id: '4',
      name: 'Alice Brown',
      email: 'alice@example.com',
      role: 'user',
      status: 'pending',
      lastLogin: '2024-02-20 11:15 AM',
      joinDate: '2024-02-19'
    }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Welcome message effect - shows only once after registration
  useEffect(() => {
    const hasShownWelcome = localStorage.getItem('adminWelcomeShown');

    if (!hasShownWelcome) {
      toast.success(
        <div className="flex flex-col items-center gap-1">
          <span className="text-lg font-semibold">👋 Hello Admin!</span>
          <span className="text-sm">Welcome to your dashboard</span>
        </div>,
        {
          duration: 3000,
          position: 'top-center',
          style: {
            background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
            color: 'white',
            borderRadius: '1rem',
          },
        }
      );

      localStorage.setItem('adminWelcomeShown', 'true');
    }
  }, []);

  const tabs = [
    { id: 'products', label: 'Products', icon: FiPackage },
    { id: 'users', label: 'User Management', icon: FiUsers },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsAddModalOpen(true);
  };

  const handleToggleSale = (product: Product) => {
    updateProduct(product.id, {
      onSale: !product.onSale,
      salePrice: product.onSale ? undefined : product.price * 0.9
    });
  };

  // Add these handler functions for user management
  const handleUserStatusChange = (_userId: string, newStatus: User['status']) => {
    toast.success(`User status updated to ${newStatus}`);
  };

  const handleUserRoleChange = (_userId: string, newRole: User['role']) => {
    toast.success(`User role updated to ${newRole}`);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await updateUser(userId, { status: 'deleted' });
        toast.success('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled ? 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between p-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-2">
              <FiHome className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Admin Panel
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-600 transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-20 bg-gray-900/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-xl"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {userEmail}
                </p>
              </div>
              <nav className="p-4 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 pt-20">
            <div className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg shadow-gray-200/50 dark:shadow-none">
              <div className="p-6">
                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-200 dark:border-gray-700 backdrop-blur-xl">
            {activeTab === 'products' && (
              <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Product Management
                  </h2>
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setIsAddModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all w-full sm:w-auto justify-center"
                  >
                    <FiPlus className="w-5 h-5" />
                    <span>Add Product</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Product
                            </th>
                            <th className="hidden sm:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Category
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Price
                            </th>
                            <th className="hidden sm:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                  <div className="h-12 w-12 flex-shrink-0">
                                    <img
                                      className="h-12 w-12 rounded-xl object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                                      src={product.images[0]}
                                      alt={product.name}
                                    />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {product.name}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                      {product.gender}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="hidden sm:table-cell px-6 py-4">
                                <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                  {product.category}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900 dark:text-white">
                                  ${product.price}
                                </div>
                                {product.onSale && product.salePrice && (
                                  <div className="text-sm text-red-500">
                                    ${product.salePrice}
                                  </div>
                                )}
                              </td>
                              <td className="hidden sm:table-cell px-6 py-4">
                                <button
                                  onClick={() => handleToggleSale(product)}
                                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                                    product.onSale
                                      ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                      : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                  }`}
                                >
                                  {product.onSale ? 'On Sale' : 'Regular Price'}
                                </button>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => handleEdit(product)}
                                    className="p-2 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg"
                                  >
                                    <FiEdit2 className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => handleToggleSale(product)}
                                    className="sm:hidden p-2 text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg"
                                  >
                                    <FiTag className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(product.id)}
                                    className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                  >
                                    <FiTrash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'users' && (
              <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    User Management
                  </h2>
                  <button
                    onClick={() => toast.success('Add user feature coming soon!')}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all w-full sm:w-auto justify-center"
                  >
                    <FiPlus className="w-5 h-5" />
                    <span>Add User</span>
                  </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            User
                          </th>
                          <th className="hidden md:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="hidden sm:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                                  {user.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user.name}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Joined {user.joinDate}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="hidden md:table-cell px-6 py-4">
                              <div className="text-sm text-gray-900 dark:text-white flex items-center gap-2">
                                <FiMail className="w-4 h-4 text-gray-400" />
                                {user.email}
                              </div>
                              {user.phone && (
                                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                  <FiPhone className="w-4 h-4" />
                                  {user.phone}
                                </div>
                              )}
                            </td>
                            <td className="hidden sm:table-cell px-6 py-4">
                              <select
                                value={user.role}
                                onChange={(e) => handleUserRoleChange(user.id, e.target.value as User['role'])}
                                className="text-sm rounded-full px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-0 focus:ring-2 focus:ring-indigo-500"
                              >
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="user">User</option>
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              <select
                                value={user.status}
                                onChange={(e) => handleUserStatusChange(user.id, e.target.value as User['status'])}
                                className={`text-sm rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-indigo-500 ${
                                  user.status === 'active'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                    : user.status === 'inactive'
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                }`}
                              >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="pending">Pending</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => toast.success('Reset password email sent!')}
                                  className="p-2 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg"
                                  title="Reset Password"
                                >
                                  <FiLock className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                  title="Delete User"
                                >
                                  <FiTrash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="p-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                    <FiSettings className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Settings</h3>
                  <p className="text-gray-600 dark:text-gray-400">This feature is coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProduct(null);
        }}
        editProduct={editingProduct}
      />
    </div>
  );
};

export default AdminDashboard;

async function updateUser(userId: string, updates: { status: string }) {
  try {
    await fetch(`/api/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}
