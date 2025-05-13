import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Checking for a token in auth.");
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
      setLoading(false);
      return;
    } else {
      axios
        .get("http://localhost:3001/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data); // full user object
        })
        .catch((err) => {
          console.error("Error fetching /api/me:", err);
          setUser(null); // token invalid or expired
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setUser(token);
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
