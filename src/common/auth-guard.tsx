import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Navigate, useLocation } from "react-router-dom";

export function AuthGuard({ children }: { children: JSX.Element }) {
  let location = useLocation();
  const loginUser = useSelector(
    (state: RootState) => state.authentication.auth
  );

  if (!loginUser.username) {
    return <Navigate to="/react" state={{ from: location }} replace />;
  }

  return children;
}
