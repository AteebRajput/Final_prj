import "./Navbar.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../../slices/userSlice"; // Add the logout action here
import LanguageSwitcher from "../../../lib/LanguageSwitcher";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [userName, setuserName] = useState(null);
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const { t } = useTranslation(); // Initialize t function for translations

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObject = JSON.parse(userData);
      setuserName(userObject.user.name);
    } else {
      console.log(t("noUserData")); // Translated message
    }
  }, [isLoggedIn, t]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error(`${t("logoutFailed")}`, error); // Translated message
    }
  };

  const renderLinks = () => {
    if (isLoggedIn) {
      return (
        <>
          <li className="language-item">
            <LanguageSwitcher />
          </li>
          <li>
            <button className="logout-button" onClick={handleLogout}>
              {t("logout")} {/* Translated Logout */}
            </button>
          </li>
        </>
      );
    }

    if (location.pathname === "/signup" || !isLoggedIn) {
      return (
        <li>
          <button className="auth-button" onClick={() => navigate("/login")}>
            {t("login")} {/* Translated Login */}
          </button>
        </li>
      );
    } else if (location.pathname === "/login") {
      return (
        <li>
          <button className="auth-button" onClick={() => navigate("/signup")}>
            {t("signup")} {/* Translated SignUp */}
          </button>
        </li>
      );
    } else {
      return (
        <>
          <li>
            <button className="auth-button" onClick={() => navigate("/login")}>
              {t("login")} {/* Translated Login */}
            </button>
          </li>
          <li>
            <button className="auth-button" onClick={() => navigate("/signup")}>
              {t("signup")} {/* Translated SignUp */}
            </button>
          </li>
        </>
      );
    }
  };

  return (
    <div className="navbar bg-gradient-to-r from-green-500 to-emerald-600">
      <nav>
        <div className="logo text-white">
          <h1>{t("pakAgrihub")}</h1> {/* Translated Website Name */}
        </div>

        <div className={`links ${isOpen ? "open" : ""}`}>
          <ul>{renderLinks()}</ul>
        </div>

        <div className="menu-icon text-white" onClick={toggleMenu}>
          {isOpen ? t("menuClose") : t("menuOpen")} {/* Translated Menu Text */}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
