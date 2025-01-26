import './App.css';
import MainPage from './Component/Firstpage/MainPage';
import Signup from './pages/signup/signup';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import VerifyEmail from './pages/verify-email/VerifyEmail';
import Navbar from './Component/Firstpage/Navbar/Navbar';
import LoginPage from './pages/login/Login';
import ForgotPasswordPage from './pages/forgetPassword/ForgetPassword';
import Dashboard from "./pages/dashboard/Dashboard";
import AccountInformation from './Component/dashboard/AccountInformation';
import AllAuctions from './Component/dashboard/AllAuctions';
import MyOrders from './Component/dashboard/MyOrder';
import ProductsPage from './Component/dashboard/ProductList';
import ProductList from './Component/BuyerDashboard/ProductList';
import BuyerDashboard from './pages/dashboard/BuyerDashboars';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard/*"
            element={<ProtectedRoute element={<Dashboard />} />}
          >
            <Route index element={<Navigate to="account" replace />} />
            <Route path="account" element={<AccountInformation />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="auctions" element={<AllAuctions />} />
          </Route>

          {/* Buyer Dashboard Route */}
          <Route
            path="/buyer-dashboard/*"
            element={<ProtectedRoute element={<BuyerDashboard />} />}
          >
            <Route path="products" element={<ProductList />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
