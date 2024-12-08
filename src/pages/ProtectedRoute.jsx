import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/FakeAuth";
import { useEffect } from "react";
import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    !isAuthenticated ? navigate("/") : null;
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? children : null;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
