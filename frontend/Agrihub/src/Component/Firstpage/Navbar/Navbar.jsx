import "./Navbar.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../../slices/userSlice"; // Add the logout action here

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [userName, setuserName] = useState(null);
  // Access the Redux state
  const { isLoggedIn, user } = useSelector((state) => state.user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Retrieve the user data from localStorage
    const userData = localStorage.getItem("user");

    // Check if the data exists
    if (userData) {
      // Parse the JSON string into an object
      const userObject = JSON.parse(userData);
      setuserName(userObject.user.name);

    } else {
      console.log("No user data found in localStorage.");
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      // Dispatch the logout action
      await dispatch(logoutUser());
      // Clear user data from localStorage
      localStorage.removeItem("user");
      // console.log("User logged out and localStorage cleared");
  
      // Navigate to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  // console.log("Check for logged in", isLoggedIn);

  const renderLinks = () => {
    // If the user is logged in, show Logout and welcome message

    if (isLoggedIn) {
      return (
        <>
          <li className="flex items-center justify-center text-lg">
            <span >Welcome, {userName || "User"}!</span>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      );
    }

    // If the user is not logged in, show Login/SignUp based on the current route
    if (location.pathname === "/signup" || !isLoggedIn) {
      return (
        <li>
          <button onClick={() => navigate("/login")}>Login</button>
        </li>
      );
    } else if (location.pathname === "/login") {
      return (
        <li>
          <button onClick={() => navigate("/signup")}>SignUp</button>
        </li>
      );
    } else {
      return (
        <>
          <li>
            <button onClick={() => navigate("/login")}>Login</button>
          </li>
          <li>
            <button onClick={() => navigate("/signup")}>SignUp</button>
          </li>
        </>
      );
    }
  };

  return (
    <div className="navbar bg-gradient-to-l from-green-300 to-green-500">
      <nav>
        <div className="logo">
          <h1>Pak Agrihub</h1>
        </div>

        <div className={`links ${isOpen ? "open" : ""}`}>
          <ul>{renderLinks()}</ul>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? "✕" : "☰"}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
