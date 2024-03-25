import { User } from "../../services/user-service";

type NavBarAppProps = {
  user: User;
};

const NavBarApp = ({ user }: NavBarAppProps) => {
  return (
    // the component is wrapped in a React.Fragment component
    // to avoid adding unnecessary DOM nodes.
    <>
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-4">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                // href="/#"
                id="profileDropdown"
                data-bs-toggle="dropdown"
              >
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {user.user.email}
                </span>
              </a>

              {/* <!-- End Profile Iamge Icon --> */}

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="/logout"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
              {/* <!-- End Profile Dropdown Items --> */}
            </li>
            {/* <!-- End Profile Nav --> */}
          </ul>
        </nav>
      {/* <!-- End Icons Navigation --> */}
    </>
  );
};

export default NavBarApp;
