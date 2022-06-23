import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProduct from "../../pages/admin/CreateProduct";
import ListProducts from "../../pages/admin/ListProducts";
import LoginScreen from "../../pages/auth/Login";
import RegisterScreen from "../../pages/auth/Register";
import Home from "../../pages/Home";
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
          <Route path="/admin/products/add" element={<CreateProduct />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default ProtectedRoutes;
