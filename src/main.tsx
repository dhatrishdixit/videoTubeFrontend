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
import { FrontPageContent } from "./components/Content/FrontPageContent.tsx";
import { MainVideoPage } from "./pages/VideoPage/VideoPage.tsx";
import { ChannelPage } from "./pages/ChannelPage/ChannelPage.tsx";
import { ChannelAboutComponent } from "./components/ChannelPageComponents/channelAboutComponent.tsx";
import { ChannelVideoComponent } from "./components/ChannelPageComponents/channelVideoComponent.tsx";
import { ChannelPostComponent } from "./components/ChannelPageComponents/channelPostComponent.tsx";
import { ChannelPlaylistComponent } from "./components/ChannelPageComponents/channelPlaylistComponent.tsx";
import { PlaylistPage } from "./pages/PlaylistPage/PlaylistPage.tsx";
import { ContentSearch } from "./components/Content/SearchContent.tsx";
import { MainContentPage } from "./pages/MainContentPage/MainContentPage.tsx";
import { SettingsPage } from "./pages/UserSettings/SettingsPage.tsx";
import { WatchHistoryPage } from "./components/Content/WatchHistoryPage.tsx";
import { UserPlaylistPage } from "./pages/PlaylistPage/UserPlaylistPage.tsx";
import { LikedVideosPage } from "./components/Content/LikedVideosPage.tsx";


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
    element:<App/>,
    children:[
      {
        path:"/",
        element:<MainContentPage/>,
        children:[
          {
            path:"/",
            element:<FrontPageContent/>
          },{
            path:"video/:videoId",
            element:<MainVideoPage/>
          },{
            path:"playlist/:playlistId",
            element:<PlaylistPage/>
          },{
            path:"videos/results",
            element:<ContentSearch/>
          },{
            path:"/settings",
            element:<SettingsPage/>
          },{
            path:"/watchHistory",
            element:<WatchHistoryPage/>
          },{
            path:"/userPlaylist",
            element:<UserPlaylistPage/>
          },{
            path:"/liked",
            element:<LikedVideosPage/>
          }
        ]
      },
      {
        path:"/channel/:channelUsername",
        element:<ChannelPage/>,
        children:[
          {
              path:"videos",
              element:<ChannelVideoComponent/>
          },{
              path:"community",
              element:<ChannelPostComponent/>
          },{
              path:"about",
              element:<ChannelAboutComponent/>
          },{
              path:"playlists",
              element:<ChannelPlaylistComponent/>
          }
        ]
      }
    ]
  },

])
// dashboard is still left 
ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ToastProvider>
      <RouterProvider router={router} />
      <Toaster />
      </ToastProvider>
      </ThemeProvider>
    </Provider>
);
