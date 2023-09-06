import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, createRefresh } from "react-auth-kit";
import api from "./api/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider
      authName="auth"
      authType="cookie"
      cookieDomain={window.location.hostname}
      cookieSecure={true}
      refresh={createRefresh({
        interval: 20, // Refreshs the token in every 10 minutes
        refreshApiCallback: async ({ refreshToken }) => {
          try {
            const {
              data: { data },
            } = await api.post<{
              data: {
                accessToken: string;
                refreshToken: string;
                user: unknown;
              };
            }>("/auth/refresh", { refreshToken });

            return {
              isSuccess: true,
              newAuthToken: data.accessToken,
              newRefreshToken: data.refreshToken,
            };
          } catch (error) {
            return {
              isSuccess: false,
              newAuthToken: "",
            };
          }
        },
      })}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
