import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const authorizationToken = `Bearer ${token}`;

  const API = import.meta.env.VITE_APP_URI_API;

  // function to check the user Authentication or not
  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();

        // our main goal is to get the user data 👇
        console.log("user data", data.userData);
        setUser(data.userData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data");
    }
  };

  //to fetch the services data from the database
  const getServices = async () => {
    try {
      const response = await fetch(`${API}/api/data/service`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.msg);
        setServices(data.msg);
      }
    } catch (error) {
      console.log(`services frontend error: ${error}`);
    }
  };

  useEffect(() => {
    getServices();
    userAuthentication();
  }, []);

  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  //   this is the get the value in either true or false in the original state of token
  let isLoggedIn = !!token;
  console.log("token", token);
  console.log("isLoggedin ", isLoggedIn);

  //   to check whether is loggedIn or not
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        services,
        authorizationToken,
        isLoading,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
