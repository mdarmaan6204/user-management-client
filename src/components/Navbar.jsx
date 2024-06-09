import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../auth";

export const Navbar = () => {
  const { isLoggedIn, user, isLoading } = useAuth();
    console.log("admin layout", user);

    if(isLoading) {
        return <h1>Loading ...</h1>;
    }
  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">SwatiTechnical</NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>
              {user?.isAdmin && (
                <li>
                  <NavLink to="/admin"> Admin </NavLink>
                </li>
              )};
              <li>
                <NavLink to="/about"> About </NavLink>
              </li>
              <li>
                <NavLink to="/service"> Services </NavLink>
              </li>
              <li>
                <NavLink to="/contact"> Contact </NavLink>
              </li>
              {isLoggedIn ? (
                <li>
                  <NavLink to="/logout"> Logout </NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register"> Register </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login"> Login </NavLink>
                  </li>
                </>
              )};
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
