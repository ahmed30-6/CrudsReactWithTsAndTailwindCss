// import { useState } from 'react';
// import {
//   FiPlus,
//   FiTag,
//   FiPackage,
//   FiUsers,
//   FiSettings,
// } from 'react-icons/fi';
// import AddProductModal from './AddProductModal';
// import ProductList from './ProductList';

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('products');
//   const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

//   const tabs = [
//     { id: 'products', label: 'Products', icon: FiPackage },
//     { id: 'sales', label: 'Sales Management', icon: FiTag },
//     { id: 'users', label: 'User Management', icon: FiUsers },
//     { id: 'settings', label: 'Settings', icon: FiSettings },
//   ];

//   return (
//     <div className="min-h-screen  bg-gray-50 dark:bg-gray-900 pt-20">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
//             Admin Dashboard
//           </h1>
//           {activeTab === 'products' && (
//             <button
//               onClick={() => setIsAddProductModalOpen(true)}
//               className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-shadow text-sm sm:text-base"
//             >
//               <FiPlus />
//               <span>Add Product</span>
//             </button>
//           )}
//         </div>

//         {/* Tabs */}
//         <div className="flex flex-wrap gap-3 mb-6">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
//                 activeTab === tab.id
//                   ? 'bg-indigo-500 text-white'
//                   : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
//               }`}
//             >
//               <tab.icon className="w-5 h-5" />
//               <span>{tab.label}</span>
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 transition-all">
//           {activeTab === 'products' && <ProductList />}
//           {activeTab === 'sales' && (
//             <div className="text-gray-600 dark:text-gray-400">
//               Sales management content here
//             </div>
//           )}
//           {activeTab === 'users' && (
//             <div className="text-gray-600 dark:text-gray-400">
//               User management content here
//             </div>
//           )}
//           {activeTab === 'settings' && (
//             <div className="text-gray-600 dark:text-gray-400">
//               Settings content here
//             </div>
//           )}
//         </div>
//       </div>
//       {/* Add Product Modal */}
//       <AddProductModal
//         isOpen={isAddProductModalOpen}
//         onClose={() => setIsAddProductModalOpen(false)}
//         editProduct={null}
//       />
//     </div>
//   );
// };

// export default AdminDashboard;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiTag, FiPackage, FiUsers, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useProducts, Product } from '../../context/ProductContext';
import toast from 'react-hot-toast';
import AddProductModal from './AddProductModal';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { userEmail, logout } = useAuth();
  const { products, deleteProduct, updateProduct } = useProducts();
  const [activeTab, setActiveTab] = useState('products');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-20">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 transition-colors"
          >
            <FiLogOut className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "tween" }}
            className="lg:hidden fixed inset-0 z-30"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-xl">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Logged in as: {userEmail}
                </p>
              </div>
              <div className="p-4 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 w-full px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-indigo-500 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Desktop Header */}
          <div className="hidden lg:flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Logged in as: {userEmail}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all hover:shadow-lg"
            >
              <FiLogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Navigation
              </h2>
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 w-full px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-indigo-500 text-white shadow-lg'
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

          {/* Content Area */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mt-4 lg:mt-0">
            {activeTab === 'products' && (
              <>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Product Management
                  </h2>
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setIsAddModalOpen(true);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all w-full sm:w-auto justify-center sm:justify-start"
                  >
                    <FiPlus className="w-5 h-5" />
                    <span>Add Product</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Product
                            </th>
                            <th className="hidden sm:table-cell px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Category
                            </th>
                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Price
                            </th>
                            <th className="hidden sm:table-cell px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0">
                                    <img
                                      className="h-10 w-10 rounded-lg object-cover"
                                      src={product.images[0]}
                                      alt={product.name}
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {product.name}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                      {product.gender}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="hidden sm:table-cell px-4 lg:px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                  {product.category}
                                </span>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white">
                                  ${product.price}
                                </div>
                                {product.onSale && product.salePrice && (
                                  <div className="text-sm text-red-500">
                                    ${product.salePrice}
                                  </div>
                                )}
                              </td>
                              <td className="hidden sm:table-cell px-4 lg:px-6 py-4 whitespace-nowrap">
                                <button
                                  onClick={() => handleToggleSale(product)}
                                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                                    product.onSale
                                      ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                      : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                  }`}
                                >
                                  {product.onSale ? 'On Sale' : 'Regular Price'}
                                </button>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end space-x-3">
                                  <button
                                    onClick={() => handleEdit(product)}
                                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors p-1 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-full"
                                  >
                                    <FiEdit2 className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => handleToggleSale(product)}
                                    className="sm:hidden text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors p-1 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-full"
                                  >
                                    <FiTag className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(product.id)}
                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
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
              </>
            )}
            {activeTab === 'users' && (
              <div className="p-4 text-gray-600 dark:text-gray-400">
                <div className="flex flex-col items-center justify-center py-12">
                  <FiUsers className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">User Management</h3>
                  <p>This feature is coming soon...</p>
                </div>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="p-4 text-gray-600 dark:text-gray-400">
                <div className="flex flex-col items-center justify-center py-12">
                  <FiSettings className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Settings</h3>
                  <p>This feature is coming soon...</p>
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