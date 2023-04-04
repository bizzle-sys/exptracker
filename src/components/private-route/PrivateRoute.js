import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  //bring data from redux store
  const user = "";
  // return user?.uid ? children : <Navigate to="/" replace />;
  return children;
};
