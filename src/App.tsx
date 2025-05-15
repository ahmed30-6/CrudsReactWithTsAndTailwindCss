import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ProductProvider } from "./context/ProductContext";
import { CollectionProvider } from "./context/CollectionContext";
import Navbar from "./components/ui/Navbar";
import HeroSection from "./components/ui/HeroSection";
import NewArrivals from "./pages/NewArrivals";
import Collections from "./pages/Collections";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Sale from "./pages/Sale";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Wishlist from "./pages/Wishlist";

// Protected route wrapper component
const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactElement, requireAdmin?: boolean }) => {
  const { isLoggedIn, userRole, userEmail, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && (userRole !== 'admin' || userEmail !== 'admin@solehaven.com')) {
    return <Navigate to="/" />;
  }

  return children;
};

// Customer-only route wrapper component
const CustomerRoute = ({ children }: { children: React.ReactElement }) => {
  const { userRole } = useAuth();

  if (userRole === 'admin') {
    return <Navigate to="/admin-dashboard" />;
  }

  return children;
};

const AppContent = () => {
  const { userRole } = useAuth();

  return (
    <>
      <Navbar userRole={userRole} />
      <Routes>
        <Route path="/" element={
          userRole === 'admin' ? 
          <Navigate to="/admin-dashboard" /> : 
          <HeroSection />
        } />
        <Route path="/new-arrivals" element={
          <CustomerRoute>
            <NewArrivals />
          </CustomerRoute>
        } />
        <Route path="/collections" element={
          <CustomerRoute>
            <Collections />
          </CustomerRoute>
        } />
        <Route path="/wishlist" element={
          <CustomerRoute>
            <Wishlist />
          </CustomerRoute>
        } />
        <Route path="/men" element={
          <CustomerRoute>
            <Men />
          </CustomerRoute>
        } />
        <Route path="/women" element={
          <CustomerRoute>
            <Women />
          </CustomerRoute>
        } />
        <Route path="/sale" element={
          <CustomerRoute>
            <Sale />
          </CustomerRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        {/* Catch all route - redirect to appropriate dashboard */}
        <Route path="*" element={
          userRole === 'admin' ? 
          <Navigate to="/admin-dashboard" /> : 
          <Navigate to="/" />
        } />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router basename="/CrudsReactWithTsAndTailwindCss">
      <ThemeProvider>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <WishlistProvider>
                <CollectionProvider>
                  <AppContent />
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      className: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white',
                      style: {
                        background: 'var(--toast-bg)',
                        color: 'var(--toast-color)',
                      },
                    }}
                  />
                </CollectionProvider>
              </WishlistProvider>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
