import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Announcements from "./pages/Announcements.tsx";
import PastEvents from "./pages/PastEvents.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import LoginPage from "./pages/LoginPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import store from "./redux/store.ts";
import CreateEventPage from "./pages/CreateEventPage.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <LoginPage />},
  { path: "/events/create", element: <CreateEventPage/>},
  { path: "/users/:userId", element: <UserPage /> },
  { path: "/announcements", element: <Announcements /> },
  { path: "/past-events", element: <PastEvents /> },
  { path: "/users/*", element: <NotFoundPage /> },
  { path: "/*", element: <NotFoundPage /> },
  //{path: '/events'},
  //{path: '/events/:id'}
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
