import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import './App.css';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { HomeAppBar } from "./components/homecomponents/HomeAppBar";
import { HomeFooter } from "./components/homecomponents/HomeFooter";
import { Home } from "./pages/home/Home";
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
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Home /> },
        // { path: "/login", element: <Login /> },
        // { path: "/signup/", element: <Signup /> },
        // { path: "/activate", element: <Activate /> },
        // { path: "/adminlogin", element: <AdminLogin /> },
      ],
    },
  ])
  return <RouterProvider router={router} />;;
}

export default App;
