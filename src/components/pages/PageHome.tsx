import React from "react";
import LoginForm from "../form/FormLogin";
import { User } from "../../services/user-service";

type PageHomeProps = {
  setUser: (user: User) => void;
};

// the PageHome component is a functional component defined
// using the React.FC type. It expects a prop called setUser
// of type (user: User) => void. This prop is used to set 
// the user in the parent component.

const PageHome: React.FC<PageHomeProps> = ({ setUser }) => {
  return (
    <>
      <section id="hero">
        <div id="hero-container" className="hero-container section-bg">
          <div className="mt-5">
            <h1>
              The Paint Company
            </h1>
            <p>
              <small>
                <em>
                  ... paint inventory made simple!
                </em>
              </small>
            </p>
          </div>
          <div className="mt-2">
            <LoginForm setUser={setUser}></LoginForm>
          </div>
        </div>
      </section>
    </>
  );
};

export default PageHome;
