import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProduct from "../../pages/admin/CreateProduct";
import EditProduct from "../../pages/admin/EditProduct";
import ListProducts from "../../pages/admin/ListProducts";
import LoginScreen from "../../pages/auth/Login";
import RegisterScreen from "../../pages/auth/Register";
import Cart from "../../pages/cart/Cart";
import CheckOut from "../../pages/checkout/CheckOut";
import Home from "../../pages/Home";
import MyOrders from "../../pages/orders/MyOrders";
import Orders from "../../pages/orders/Orders";
import ProductDetail from "../../pages/products/ProductDetail";

const ProtectedRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/signup" element={<RegisterScreen />} />
          <Route path="/admin/products" element={<ListProducts />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/products/add" element={<CreateProduct />} />
          <Route path="/admin/products/:id" element={<EditProduct />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default ProtectedRoutes;
