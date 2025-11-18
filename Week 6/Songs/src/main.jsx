import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/app.jsx";
import AddSong, { action as addSongAction } from "./components/addSong.jsx";
import NotFoundPage from "./components/notFoundPage.jsx";
import SearchByArtist from "./components/searchByArtist.jsx";
import BuySong, { BuySongAction } from "./components/buySong.jsx";
import SearchByArtist2 from "./components/searchByArtist2.jsx";
import Dashboard from "./components/dashboard.jsx";
import DashboardItems from "./components/dashboardItems.jsx";
import { UserPage, userLoader } from "./components/userPage.jsx";

// Defining Client Side Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "user/:userId",
    element: <UserPage />,
    loader: userLoader,
  },
  {
    path: "/buy",
    element: <BuySong />,
    action: BuySongAction,
  },
  // Using Routes with Forms and Actions
  {
    path: "/addsong",
    element: <AddSong />,
    action: addSongAction,
  },
  {
    path: "/searchbyartist",
    element: <SearchByArtist />,
  },
  {
    path: "/searchbyartist2",
    element: <SearchByArtist2 />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/:id",
    element: <DashboardItems />,
  },

  // Dealing with Not Found Pages
  { path: "/*", element: <NotFoundPage /> },

  //Todo : Add Search Functionality with Loaders
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
