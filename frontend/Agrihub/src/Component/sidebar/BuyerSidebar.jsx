import React from "react";
import { ShoppingCart, FileText, User, CreditCard, UserX } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BuyerSidebar = () => {
  const menuItems = [
    {
      icon: User,
      label: "Account Information",
      path: "/buyer-dashboard/account",
    },
    { icon: ShoppingCart, label: "My Orders", path: "/buyer-dashboard/orders" },
    {
      icon: FileText,
      label: "Browse Products",
      path: "/buyer-dashboard/products",
    },
    {
      icon: CreditCard,
      label: "My Payments",
      path: "/buyer-dashboard/payments",
    },
    {
      icon: UserX,
      label: "Delete Account",
      path: "/buyer-dashboard/delete-account",
    },
  ];

  const location = useLocation();
  const activePath = location.pathname;

  return (
    <aside className="fixed top-20 left-0 h-full w-64 bg-white border-r border-gray-200">
      {/* Profile Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mb-4">
            <img
              src="/api/placeholder/80/80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Jane Doe</h2>
          <p className="text-sm text-gray-500">City Buyer</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-sm ${
                  activePath === item.path
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default BuyerSidebar;
