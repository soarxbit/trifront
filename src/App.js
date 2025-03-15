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
        // { path: "/user/mybusiness", element: <Mybusiness /> },
        // { path: "/user/myteam", element: <MyTeam /> },
        // { path: "/user/intronew", element: <IntroNew /> },
        // { path: "/user/upgrade", element: <Upgrade /> },
        // { path: "/user/messages", element: <Message /> },
        // { path: "/user/incomedetails", element: <IncomeDetails /> },
        // { path: "/user/withdraw", element: <Withdraw /> },
        // { path: "/user/settings", element: <Settings /> },
        // { path: "/user/incomes/:inctype", element: <Incomes /> },
        // { path: "/login", element: <Login /> },
        // { path: "/signup/:spid", element: <Signup /> },
        // { path: "/adminlogin", element: <AdminLogin /> },
      ],
    },
  ])
  return <RouterProvider router={router} />;;
}

export default App;
