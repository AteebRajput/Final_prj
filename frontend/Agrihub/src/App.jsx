import './App.css';
import MainPage from './Component/Firstpage/MainPage';
import Signup from './pages/signup/signup';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import VerifyEmail from './pages/verify-email/VerifyEmail';
import Navbar from './Component/Firstpage/Navbar/Navbar';
import LoginPage from './pages/login/Login';
import ForgotPasswordPage from './pages/forgetPassword/ForgetPassword';
import Dashboard from "./pages/dashboard/Dashboard"
import AccountInformation from './Component/dashboard/AccountInformation';
import AllBids from './Component/dashboard/AllBids';
import MyOrders from './Component/dashboard/MyOrder';
import ProductsPage from './Component/dashboard/ProductList';
//import DeleteAccount from "./Component/dashboard/DeleteAccount"
import { useSelector } from 'react-redux';


// ProtectedRoute Component
const ProtectedRoute = ({ element }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // If logged in, render the element; otherwise, redirect to login page
  return isLoggedIn ? element : <Navigate to="/login"  />;
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
            element={
              <ProtectedRoute
                element={
                  <Dashboard />
                }
              />
            }
          >
            {/* Dashboard Nested Routes */}
            <Route index element={<Navigate to="account" replace />} />
            <Route path="account" element={<AccountInformation/>} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="products" element={<ProductsPage/>} />
            <Route path="bids" element={<AllBids />} />
            
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
