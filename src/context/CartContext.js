import { createContext, useContext, useEffect, useState } from "react";

const useCartContext = createContext();
export function CartContextProvider({ children }) {
  const [cart, setCart] = useState({});
  function addToCart(product) {
    setCart((prevCart) => ({ ...prevCart, [product.id]: product }));
    
   
  }

  function removeFromCart(product) {
    const newCart = { ...cart };
    delete newCart[product.id];
    setCart(newCart);
  }
  function clearCart() {
    setCart({});
  }
  function getTotalPrice() {
    let total = 0;
    for (let key in cart) {
      total += cart[key].price;
    }
    return total;
  }

  function getTotalQuantity() {
    let total = 0;
    for (let key in cart) {
      total += cart[key].quantity;
    }
    return total;
  }

  function getTotalItems() {
    let total = 0;
    for (let key in cart) {
      total += cart[key].quantity;
    }
    return total;
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <useCartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getTotalQuantity,
        getTotalItems,
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
