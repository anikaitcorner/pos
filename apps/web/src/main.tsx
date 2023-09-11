import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, createRefresh } from "react-auth-kit";
import api from "./api/index.ts";
import { IUser } from "@codernex/types";
import { ThemeProvider } from "./context/theme-provider.tsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./app/store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider
        authName="auth"
        authType="cookie"
        refresh={createRefresh({
          interval: 40, // Refreshs the token in every 10 minutes
          refreshApiCallback: async ({ refreshToken }) => {
            try {
              const {
                data: { data },
              } = await api.post<{
                data: {
                  accessToken: string;
                  refreshToken: string;
                  user: IUser;
                };
              }>("/auth/refresh", { refreshToken });

              return {
                isSuccess: true,
                newAuthToken: data.accessToken,
                newRefreshToken: data.refreshToken,
                newAuthTokenExpireIn: 60,
                newRefreshTokenExpiresIn: 60 * 24,
                newAuthUserState: data.user,
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
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Toaster />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
