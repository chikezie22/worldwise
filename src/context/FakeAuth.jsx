/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types";
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  userName: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, userName: action.payload, isAuthenticated: true };

    case "logout":
      return { ...state, userName: null, isAuthenticated: false };

    default:
      throw new Error("Unknown action");
  }
}

const AuthProvider = ({ children }) => {
  const [{ userName, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };
  return (
    <AuthContext.Provider
      value={{ logout, login, userName, isAuthenticated, FAKE_USER }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Context is used outside the provider");
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { useAuth, AuthProvider };
