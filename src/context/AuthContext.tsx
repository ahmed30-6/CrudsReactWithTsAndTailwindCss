import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthState {
  isLoggedIn: boolean;
  userRole: string | null;
  userEmail: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Valid credentials
const VALID_CREDENTIALS = {
  admin: {
    email: 'admin@solehaven.com',
    password: 'Admin@123',
    role: 'admin'
  },
  customer: {
    email: 'customer@solehaven.com',
    password: 'Customer@123',
    role: 'customer'
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    userRole: null,
    userEmail: null
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userRole = localStorage.getItem('userRole');
      const userEmail = localStorage.getItem('userEmail');

      // Validate stored credentials
      const isValidAdmin = userRole === 'admin' && userEmail === VALID_CREDENTIALS.admin.email;
      const isValidCustomer = userRole === 'customer' && userEmail === VALID_CREDENTIALS.customer.email;

      if (isLoggedIn && (isValidAdmin || isValidCustomer)) {
        setAuthState({
          isLoggedIn: true,
          userRole,
          userEmail
        });
      } else {
        // Clear invalid credentials
        localStorage.removeItem('userRole');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        setAuthState({
          isLoggedIn: false,
          userRole: null,
          userEmail: null
        });
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Check admin credentials
      if (email === VALID_CREDENTIALS.admin.email && password === VALID_CREDENTIALS.admin.password) {
        const newState = {
          isLoggedIn: true,
          userRole: 'admin',
          userEmail: email
        };
        setAuthState(newState);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userEmail', email);
        return true;
      }

      // Check customer credentials
      if (email === VALID_CREDENTIALS.customer.email && password === VALID_CREDENTIALS.customer.password) {
        const newState = {
          isLoggedIn: true,
          userRole: 'customer',
          userEmail: email
        };
        setAuthState(newState);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'customer');
        localStorage.setItem('userEmail', email);
        return true;
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setAuthState({
      isLoggedIn: false,
      userRole: null,
      userEmail: null
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};