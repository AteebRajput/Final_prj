
import { Outlet } from "react-router-dom";
import BuyerSidebar from "../../Component/sidebar/Sidebar";

// const Dashboard = () => {
//   return (
//     <div className="flex">
//       {/* Fixed Sidebar */}
//       <div className="w-64 h-screen fixed top-0 left-0 bg-white border-r">
//         <BuyerSidebar />
//       </div>

//       {/* Main Content Area */}
//       <div className="ml-64 w-full p-6">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


const Dashboard = () => {
  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <BuyerSidebar />

      {/* Main Content Area */}
      <div className="ml-64 w-full p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard; 