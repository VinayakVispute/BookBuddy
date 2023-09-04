import { createContext, useState, useEffect } from "react";
const AuthContext = createContext();

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [localtoken, setlocalToken] = useState(null);

  const saveTokenToLocalStorage = (jwtToken) => {
    localStorage.setItem("authToken", jwtToken);
  };
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("authToken");
  };

  useEffect(() => {
    const storedToken = getTokenFromLocalStorage();
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setIsLoggedIn(true);
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
      setToken(null);
      setUser(null);
    }
  }, []);

  const login = (jwtToken, user) => {
    console.log("setting token");
    setIsLoggedIn(true);
    setToken(jwtToken);

    // Save the token to localStorage
    saveTokenToLocalStorage(jwtToken);

    // Save the user object to localStorage
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setUser(null);

    // Clear the token and user data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  const value = {
    isLoggedIn,
    token,
    login,
    user,
    logout,
  };

  return <AuthContext.Provider value={value} {...props} />;
}
export { AuthContext, AuthProvider };
