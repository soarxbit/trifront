import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import './App.css';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { HomeAppBar } from "./components/homecomponents/HomeAppBar";
import { HomeFooter } from "./components/homecomponents/HomeFooter";
import { Home } from "./pages/home/Home";
import { Signup } from "./pages/home/Signup";
import { Login } from "./pages/home/Login";
import { UserAppBar } from "./components/usercomponents/UserAppBar";
import { UserFooter } from "./components/usercomponents/UserFooter";
import { UserDashBoard } from "./pages/user/userdashboard/UserDashBoard";
import { AdminLogin } from "./pages/home/AdminLogin";
import { AdminAppBar } from "./components/admcomponents/AdminAppBar";
import { AdmFooter } from "./components/admcomponents/AdmFooter";
import { AdmDashBoard } from "./pages/admin/admdashboard/AdmDashBoard";
import { LiveAccountNew } from "./pages/admin/liveaccount/LiveAccountNew";
import { LiveAccount } from "./pages/user/liveaccount/LiveAccount";
import { MyBusiness } from "./pages/user/mybusiness/MyBusiness";
import { IncomeDetails } from "./pages/user/incomedetails/IncomeDetails";
import { MyTeam } from "./pages/user/myteam/MyTeam";
function App() {
  const HomeLayout = () => {
    return (
      <div>
        <HomeAppBar />
        <Outlet />
        <HomeFooter />
      </div>
    );
  };
  const UserLayout = () => {
    return (
      <div>
        <UserAppBar />
        <Outlet />
        <UserFooter />
      </div>
    );
  };
  const AdminLayout = () => {
    return (
      <div>
        <AdminAppBar />
        <Outlet />
        <AdmFooter />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signup/", element: <Signup /> },
        // { path: "/activate", element: <Activate /> },
        { path: "/adminlogin", element: <AdminLogin /> },
      ],
    },
    {
      path: "/user",
      element: <UserLayout />,
      children: [
        { path: "/user/", element: <UserDashBoard /> },
        { path: "/user/liveaccount", element: <LiveAccount /> },
        { path: "/user/mybusiness", element: <MyBusiness /> },
        { path: "/user/incomedetails", element: <IncomeDetails /> },
        { path: "/user/myteam", element: <MyTeam /> },
        // { path: "/user/liveaccountnew", element: <LiveAccountNew /> },
        // { path: "/user/myteam", element: <MyTeam /> },
        // { path: "/user/intronew", element: <IntroNew /> },
        // { path: "/user/upgrade", element: <Upgrade /> },
        // { path: "/user/messages", element: <Message /> },
        
        // { path: "/user/withdraw", element: <Withdraw /> },
        // { path: "/user/settings", element: <Settings /> },
        // { path: "/user/incomes/:inctype", element: <Incomes /> },
        // { path: "/login", element: <Login /> },
        // { path: "/signup/:spid", element: <Signup /> },
        // { path: "/adminlogin", element: <AdminLogin /> },
      ],
    },
    {
      path:"/admin",
      element: <AdminLayout />,
      children:[
        {path:"/admin/", element:<AdmDashBoard />},
        { path: "/admin/liveaccountnew", element: <LiveAccountNew /> },
        // {path:"/admin/withdraw", element:<AdminWithdraw />},
        // {path:"/admin/claimback", element:<AdminClaimBack />},
        // {path:"/admin/changeaddress", element:<ChangeAddress />},
        // {path:"/admin/changesponsor", element:<ChangeSponsor />},
        // {path:"/admin/updaterank", element:<AdmUpdateRank />},
        // {path:"/admin/updatesuperid", element:<UpdateSuperId />},
        // {path:"/admin/monthly", element:<Monthly />},
        // {path:"/admin/platinum", element:<AdmPlatinum />},
        // {path:"/admin/diamond", element:<AdmDiamond />},
        // {path:"/admin/crown", element:<Crown />},
        // {path:"/admin/changedepositaddress", element:<ChangeDepAddr />},
      ]
    }
  ])
  return <RouterProvider router={router} />;;
}

export default App;
