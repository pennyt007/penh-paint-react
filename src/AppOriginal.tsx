import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "./services/user-service";
import { User } from "./services/user-service";
import NavBarPage from "./components/navbar/NavBarPage";
import NavBarApp from "./components/navbar/NavBarApp";
import PageAbout from "./components/pages/PageAbout";
import PageContactUs from "./components/pages/PageContactUs";
import PageFAQ from "./components/pages/PageFAQ";
import PageHome from "./components/pages/PageHome";
import PageWhyUs from "./components/pages/PageWhyUs";
import FamilyStudents from "./components/family/FamilyStudents";
import Logout from "./components/logout/Logout";




const App = () => {
  const [user, setUser] = useState<User|null>();

  // fetch current user asynchronously when component mounts
  // the empty dependency array ([]) ensures that this effect
  // runs only once when the component mounts.
  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      if (user) setUser(user);
    };
    getUser();
  }, []);

  return (
    <Router>
      <React.Fragment>
        {/* if user is falsy the header and main sections for
        non-authenticated useres are rendered */}
        {!user && (
          <>
            <header
              id="header"
              className="header fixed-top d-flex align-items-center"
            >
              <NavBarPage></NavBarPage>
            </header>
            <main id="mainWithLogin" className="main">
              <PageHome setUser={setUser}></PageHome>
              <PageAbout></PageAbout>
              <PageWhyUs></PageWhyUs>
              <PageFAQ></PageFAQ>
              <PageContactUs></PageContactUs>
            </main>
          </>
        )}
        {/* if user is truthy the header and main sections for
        authenticated useres are rendered */}
        {user && (
          <>
            <header
              id="header"
              className="header fixed-top d-flex align-items-center"
            >
              <NavBarApp user={user}></NavBarApp>
            </header>

            <main id="main" className="main">
              <Routes>
                <Route path="/" element={<PageHome setUser={setUser} />} />
                <Route path="/familyStudents" element={<FamilyStudents />} />
                <Route path="/logout" element={<Logout/>} />
              </Routes>
              <ToastContainer position="top-center" />
            </main>
          </>
        )}
      </React.Fragment>
    </Router>
  );
};

export default App;
