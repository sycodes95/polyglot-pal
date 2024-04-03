import { Navigate, Outlet } from "react-router-dom";
import Landing from "../features/misc/routes/Landing";
import { MainLayout } from "@/components/Layout";

const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
};

export const PublicRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element:  <Landing />},
      { path: "*", element: <Navigate to={"."} /> }
    ]
  }
];