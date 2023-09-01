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
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

  const login = (jwtToken, user) => {
    console.log("setting token");
    setIsLoggedIn(true);
    setToken(jwtToken);
    setUser(user);
    // Save the token to localStorage
    saveTokenToLocalStorage(jwtToken);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);

    // Clear the token from localStorage
    localStorage.removeItem("authToken");
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
