import { Routes, Route } from "react-router-dom";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
