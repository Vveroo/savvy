import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, quantidade = 1) => {
    const existingItem = cart.find((c) => c.id === item.id);
    
    if (existingItem) {
      setCart(
        cart.map((c) =>
          c.id === item.id
            ? { ...c, quantidade: (c.quantidade || 1) + quantidade }
            : c
        )
      );
    } else {
      setCart([...cart, { ...item, quantidade }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantidade) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantidade } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartItems = cart;
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.preco * (item.quantidade || 1),
    0
  );

  return (
    <CartContext.Provider value={{ cart, cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};
