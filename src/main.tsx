import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Announcements from "./pages/Announcements.tsx";
import PastEvents from "./pages/PastEvents.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/announcements", element: <Announcements /> },
  { path: "/past-events", element: <PastEvents /> },
  { path: "/*", element: <NotFoundPage /> },
  //{path: '/login', element: <LoginPage />},
  //{path: '/events'},
  //{path: '/events/:id'}
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
