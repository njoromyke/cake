import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "../../pages/auth/Login";
import RegisterScreen from "../../pages/auth/Register";
import Home from "../../pages/Home";

const ProtectedRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/signup" element={<RegisterScreen />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default ProtectedRoutes;
