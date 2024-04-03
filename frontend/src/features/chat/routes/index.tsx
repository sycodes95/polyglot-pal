import { Route, Routes } from "react-router-dom";
import { Chat } from "./Chat";


export const ChatRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Chat />} />
      <Route path=":conversationId" element={<Chat />} />
    </Routes>
  )
};