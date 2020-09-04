import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext, ContextType } from "../store/context/AuthContext";
import { LOGIN } from "./routes";

type ProtedtedRoutesProps = {
  component: React.FC;
  path: string;
  exact?: boolean | undefined;
};

const ProtectedRoute: React.FC<ProtedtedRoutesProps> = ({
  component,
  path,
  exact,
}) => {
  //context
  const ctx = useContext(AuthContext);
  const { state } = ctx as ContextType;

  return state.isAutenticated ? (
    <Route exact={exact} path={path} component={component} />
  ) : (
    <Redirect to={LOGIN} />
  );
};

export default ProtectedRoute;
