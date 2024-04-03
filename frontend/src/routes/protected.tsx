import { MainLayout } from "@/components/Layout";
import TalkWithPolyGlot from "../pages/talkWithPolyglot";
import { Navigate, Outlet } from "react-router-dom";
import { Chat } from "../features/chat/routes/Chat";

const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
};

export const ProtectedRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "c/:conversationId", element:  <Chat />},
      { path: "", element:  <Chat />},
      { path: "*", element: <Navigate to={"."} /> }
    ]
  }
];