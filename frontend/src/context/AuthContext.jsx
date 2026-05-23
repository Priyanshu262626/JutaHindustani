import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // If user is a customer, load their database cart
      if (parsedUser.role === 'ROLE_CUSTOMER') {
        loadCart();
      }
    }
    setLoading(false);
  }, []);

  const loadCart = async () => {
    try {
      const userCart = await api.cart.get();
      setCart(userCart);
    } catch (err) {
      console.error('Failed to load cart:', err);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await api.auth.login(email, password);
      localStorage.setItem('token', data.token);
      
      const loggedUser = {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role
      };
      
      localStorage.setItem('user', JSON.stringify(loggedUser));
      setToken(data.token);
      setUser(loggedUser);

      if (loggedUser.role === 'ROLE_CUSTOMER') {
        // Load their cart immediately
        const userCart = await api.cart.get();
        setCart(userCart);
      } else {
        setCart(null); // Admin has no cart
      }
      
      setLoading(false);
      return loggedUser;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const signup = async (name, email, password, isAdmin) => {
    return await api.auth.signup(name, email, password, isAdmin);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    setCart(null);
  };

  // Cart operations exposed globally
  const addToCart = async (productId, quantity, size) => {
    if (!user) throw new Error('Please login to add items to cart');
    try {
      const updatedCart = await api.cart.addItem(productId, quantity, size);
      setCart(updatedCart);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateCartQuantity = async (itemId, quantity) => {
    try {
      const updatedCart = await api.cart.updateQuantity(itemId, quantity);
      setCart(updatedCart);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const updatedCart = await api.cart.removeItem(itemId);
      setCart(updatedCart);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      await api.cart.clear();
      setCart({ cartItems: [] });
    } catch (err) {
      console.error(err);
    }
  };

  const value = {
    user,
    token,
    cart,
    loading,
    login,
    signup,
    logout,
    loadCart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
