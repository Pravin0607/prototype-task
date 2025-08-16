import { Navigate } from "react-router";
import { useAppSelector } from "../state/store";
import type { ReactNode } from "react";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAppSelector(state => state.session.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}
