import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "../../services/user-service";
import { User } from "../../services/user-service";
import Header from "./Header";
import NavBarApp from "../navbar/NavBarApp";
import NavBarPage from "../navbar/NavBarPage";
import MainSections from "./MainSections";
import Error from "../error/Error";

const App = () => {
  //state variable to store login user
  const [user, setUser] = useState<User>();
  // state variable to handle error messages
  const [error, setError] = useState("");
  // fetch current user asynchronously when component mounts
  // the empty dependency array ([]) ensures that this effect
  // runs only once when the component mounts.
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user) setUser(user);
      } catch (error: any) {
        setError(error);
      }
    };
    getUser();
  }, []);

  return (
    <Router>
      {/* conditional rendering based on error and user */}
      <>
        {/* if there is an error, Error component is rendered */}
        {error && <Error></Error>}
        {/* if no errors components are rendered */}
        {!error &&
          (user ? (
            <Header navBarComponent={<NavBarApp user={user} />} />
          ) : (
            <Header navBarComponent={<NavBarPage />} />
          ))}
        {!error && <MainSections user={user} setUser={setUser} />}
      </>
    </Router>
  );
};

export default App;
