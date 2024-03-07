import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PageRoutes } from "./configs";

export const ProtectedRoute = (props: any) => {
  const loginData = useSelector((state: any) => state.auth);
  const { isLoggedin } = props;
  return !isLoggedin ? (
    <Navigate to={PageRoutes.HOME} replace />
  ) : (
    // <Navigate to={PageRoutes.DASHBOARD} replace/>
    <Outlet />
  );
};
