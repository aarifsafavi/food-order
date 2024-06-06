import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearAll: () => {},
  replaceCartItems: (items) => {}, // If you need to replace the items from local storage
});

export default CartContext;
