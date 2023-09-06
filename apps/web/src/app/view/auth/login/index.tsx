import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import api from "../../../../api";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const isAuth = useMemo(() => isAuthenticated(), [isAuthenticated]);
  useEffect(() => {
    if (isAuth) {
      return navigate("/");
    }
  }, [isAuth, navigate]);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const {
          data: { data },
        } = await api.post<{
          data: {
            accessToken: string;
            refreshToken: string;
            user: unknown;
          };
        }>("/auth", loginData);

        if (data)
          signIn({
            expiresIn: 60,
            token: data.accessToken,
            tokenType: "Bearer",
            refreshToken: data.refreshToken,
            refreshTokenExpireIn: 60 * 24,
            authState: data.user,
          });

        navigate("/", { preventScrollReset: true, replace: true });
      }}
    >
      <input
        type="text"
        name="usernameOrEmail"
        onChange={(e) => {
          setLoginData((prev) => ({
            ...prev,
            usernameOrEmail: e.target.value,
          }));
        }}
      />
      <input
        type="text"
        name="password"
        onChange={(e) => {
          setLoginData((prev) => ({ ...prev, password: e.target.value }));
        }}
      />
      <button type="submit">Login</button>
    </form>
  );
};
