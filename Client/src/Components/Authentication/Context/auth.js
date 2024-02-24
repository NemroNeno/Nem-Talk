import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const nav = useNavigate();
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  const [selectedChat, setSelectedChat] = useState();
  const [chat, setChat] = useState([]);

  //axios.defaults.headers.common["Authorization"]=auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("authChat");
    if (data) {
      const parsed = JSON.parse(data);
      console.log("Below is the parsed data");

      setAuth({
        ...auth,
        user: parsed.user,
        token: parsed.token,
      });
    } else {
      nav("/");
    }
    //elint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider
      value={[auth, setAuth, selectedChat, setSelectedChat, chat, setChat]}
    >
      {children}
    </AuthContext.Provider>
  );
};

//Custom Hook

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
