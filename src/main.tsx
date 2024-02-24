import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage.tsx";
import RegisterPage from "./pages/Register/RegisterPage.tsx";
import { ToastProvider } from "./components/ui/toast.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { ContentMain } from "./components/Content/content.tsx";
import { MainPage } from "./pages/MainPage/MainPage.tsx";

const router = createBrowserRouter([
  {
    path:"/login",
    element:<LoginPage/>
  },
  {
    path:"/register",
    element:<RegisterPage/>
  },
  {
    path:"/",
    element:<MainPage/>
  },
])

// our create BrowserRouter is made using context api in react 
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>  
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ToastProvider>
      <RouterProvider router={router} />
      <Toaster />
      </ToastProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
