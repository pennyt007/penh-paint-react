import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { User } from "../../services/user-service";
import PageHome from "../pages/PageHome";
import Manager from "../manager/Manager";
import Logout from "../logout/Logout";

interface MainSectionsProps {
  user?: User;
  setUser: (user: User) => void;
}

// main component with routes
const MainSections: React.FC<MainSectionsProps> = ({ user, setUser }) => (
  /* conditionally setting the id because the login form needs */
  /* different position from the top then the grid */
  <main id={user ? "main" : "mainWithLogin"} className="main">
    <Routes>
      <Route path="/" element={<PageHome setUser={setUser} />} />
      <Route path="/manager" element={<Manager />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  
    <ToastContainer position="top-center" />
  </main>
);

export default MainSections;
