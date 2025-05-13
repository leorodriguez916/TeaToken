import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Checking for a token in authenticator:", token);

    if (!token) {
      setLoading(false);
      return;
    } else {
      axios
        .get("http://localhost:3001/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setMe(res.data);
        })
        .catch((err) => {
          console.error("Error fetching /api/me:", err);
          setMe(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ me, setMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
