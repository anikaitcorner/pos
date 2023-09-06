import { Outlet, useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import React, { useEffect, useMemo } from "react";

export const AuthState: React.FC = React.memo(() => {
  const isAuthenticated = useIsAuthenticated();

  const isAuth = useMemo(() => isAuthenticated(), [isAuthenticated]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      return navigate("login", { replace: true });
    }
  });

  return <Outlet />;
});
