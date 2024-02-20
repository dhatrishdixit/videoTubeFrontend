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


const router = createBrowserRouter([
  {
    path:"/login",
    element:<LoginPage/>
  },
  {
    path:"/register",
    element:<RegisterPage/>
  }
])

// our create BrowserRouter is made using context api in react 
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
   
  </React.StrictMode>,
);
