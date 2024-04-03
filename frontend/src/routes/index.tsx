import { useRoutes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"
import { ProtectedRoutes } from "./protected";
import { PublicRoutes } from "./public";

export const AppRoutes = () => {
  const auth = useAuth();

  // const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = auth.user ? ProtectedRoutes : PublicRoutes;

  const element = useRoutes([...routes]);

  return <>{element}</>
}