import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/http-service";

// functional component used to log out current user by
// call logout service which removed JWT from local storage
const Logout = () => {
  // initialize useNavigate
  const navigate = useNavigate();
 // used to call logout service and navigate to
 // login home page
  useEffect(() => {
    logout();
    navigate("/");
  }, []);

  return null;
};

export default Logout;
