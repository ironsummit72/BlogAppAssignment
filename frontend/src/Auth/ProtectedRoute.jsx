import { useSelector } from "react-redux";
import {  Navigate, } from "react-router-dom";
import PropTypes from "prop-types";
function ProtectedRoute({ children }) {
  const auth = useSelector((state) => state.isUserAuthenticated);
  if (auth) {
    return <div>{children}</div>;
  }
  return <Navigate to={"/login"} replace={true} />;
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}
export default ProtectedRoute;