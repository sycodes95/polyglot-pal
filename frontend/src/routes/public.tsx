import { Navigate, Outlet } from "react-router-dom";
import Landing from "../features/misc/routes/Landing";
import { MainLayout } from "@/components/Layout";
import { AuthLayout } from "../features/auth/components/AuthLayout";
import { Login } from "../features/auth/routes";
import { Register } from "../features/auth/routes";

const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
};

const AuthApp = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};


export const PublicRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element:  <Landing />},
      { path: "*", element: <Navigate to={"."} /> },
    ],
  },

  {
    path: "/",
    element: <AuthApp />,
    children: [
      { path: "login", element: <Login />},
      { path: "register", element: <Register />},
    ],
  }
];