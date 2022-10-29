import { Navigate } from "react-router";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const authed = false; //isauth() // isauth() returns true or false based on localStorage

  return authed ? children : <Navigate to="/login" />;
};
