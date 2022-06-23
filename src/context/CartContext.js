import { createContext, useContext, useEffect, useState } from "react";

const useCartContext = createContext();
export function CartContextProvider({ children }) {
  const [cart, setCart] = useState({
    items: [],
    total: 0,
    totalPrice: 0,
  });

  

  async function addToCart(item) {
    const newCart = { ...cart };
    const itemIndex = newCart.items.findIndex((i) => i.id === item.id);
    if (itemIndex === -1) {
      newCart.items.push({ ...item, quantity: 1 });
    } else {
      newCart.items[itemIndex].quantity++;
    }
    newCart.total = newCart.items.reduce((acc, cur) => acc + cur.quantity, 0);
    newCart.totalPrice = newCart.items.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  async function removeFromCart(item) {
    const newCart = { ...cart };
    const itemIndex = newCart.items.findIndex((i) => i.id === item.id);
    if (itemIndex !== -1) {
      newCart.items.splice(itemIndex, 1);
    }
    newCart.total = newCart.items.reduce((acc, cur) => acc + cur.quantity, 0);
    newCart.totalPrice = newCart.items.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  async function clearCart() {
    const newCart = { ...cart };
    newCart.items = [];
    newCart.total = 0;
    newCart.totalPrice = 0;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  async function updateProductQty(item, qty) {
    const newCart = { ...cart };
    const itemIndex = newCart.items.findIndex((i) => i.id === item.id);
    if (itemIndex !== -1) {
      newCart.items[itemIndex].quantity = qty;
    }
    newCart.total = newCart.items.reduce((acc, cur) => acc + cur.quantity, 0);
    newCart.totalPrice = newCart.items.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);
  
  return (
    <useCartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateProductQty,
      }}
    >
      {children}
    </useCartContext.Provider>
  );
}
export function useCart() {
  return useContext(useCartContext);
}
export default useCartContext;
