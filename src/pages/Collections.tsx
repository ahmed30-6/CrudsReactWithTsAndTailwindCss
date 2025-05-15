import { motion } from 'framer-motion';
import { FiArrowRight, FiShoppingBag, FiHeart, FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCollections } from '../context/CollectionContext';
import toast from 'react-hot-toast';

const Collections = () => {
  const navigate = useNavigate();
  const { collections, addToWishlist, removeFromWishlist, isInWishlist, loading } = useCollections();

  const handleShopNow = (collectionId: number) => {
    navigate(`/collection/${collectionId}`);
  };

  const handleWishlist = (collectionId: number) => {
    if (isInWishlist(collectionId)) {
      removeFromWishlist(collectionId);
    } else {
      addToWishlist(collectionId);
    }
  };

  const handleQuickView = (collectionId: number) => {
    const collection = collections.find(c => c.id === collectionId);
    if (collection) {
      toast(
        <div className="flex items-start gap-4">
          <img
            src={collection.image}
            alt={collection.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 dark:text-white">
              {collection.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {collection.items} items available
            </p>
          </div>
        </div>
      , {
        duration: 3000,
        style: {
          background: 'white',
          color: 'black',
          padding: '16px',
          borderRadius: '12px',
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FiLoader className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            Our Collections
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Explore our carefully curated collections, each telling its own unique story through design and craftsmanship.
          </p>
        </motion.div>

        {/* Featured Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          {collections.filter(c => c.featured).map(collection => (
            <div
              key={collection.id}
              className="relative h-[500px] rounded-3xl overflow-hidden group"
            >
              <div className="absolute inset-0">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
              <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {collection.name}
                  </h2>
                  <p className="text-lg text-gray-200 mb-6 max-w-xl">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleShopNow(collection.id)}
                      className="px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 group"
                    >
                      Shop Now
                      <FiArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => handleWishlist(collection.id)}
                      className={`p-4 rounded-xl backdrop-blur-sm transition-colors ${
                        isInWishlist(collection.id)
                          ? 'bg-red-500/90 text-white hover:bg-red-600/90'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <FiHeart className="w-5 h-5" />
                    </button>
                    <span className="text-white text-sm bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                      {collection.items} Items
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Other Collections Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {collections.filter(c => !c.featured).map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuickView(collection.id)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
                      title="Quick View"
                    >
                      <FiShoppingBag className="w-5 h-5 text-gray-800" />
                    </button>
                    <button
                      onClick={() => handleWishlist(collection.id)}
                      className={`p-2 backdrop-blur-sm rounded-lg transition-colors ${
                        isInWishlist(collection.id)
                          ? 'bg-red-500/90 text-white hover:bg-red-600/90'
                          : 'bg-white/90 text-gray-800 hover:bg-white'
                      }`}
                      title={isInWishlist(collection.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <FiHeart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {collection.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {collection.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {collection.items} Items
                  </span>
                  <button
                    onClick={() => handleShopNow(collection.id)}
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
                  >
                    <span className="mr-2">View Collection</span>
                    <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Collections;