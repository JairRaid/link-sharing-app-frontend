import { createBrowserRouter, Navigate } from "react-router";
import AuthLayout from "../features/auth/layouts/AuthLayout";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import DashboardLayout from "../features/dashboard/layouts/DashboardLayout";
import LinksPage from "../features/dashboard/pages/LinksPage";
import ProfilePage from "../features/dashboard/pages/ProfilePage";
import PageLoader from "../components/loaders/PageLoader";
import ProtectedRoutes from "./ProtectedRoutes";
import { verifySession } from "../services/authService";
import PublicRoutes from "./PublicRoutes";
import PublicProfile from "../features/PublicProfile/PublicProfile";
import PreviewPage from "../features/preview/pages/PreviewPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: verifySession,
    element: <Navigate to="/links" replace />,
    HydrateFallback: PageLoader,
  },
  // Auth routes
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
        HydrateFallback: PageLoader,
      },
      {
        path: "/register",
        element: <RegisterPage />,
        HydrateFallback: PageLoader,
      },
    ],
  },

  // Protected routes
  {
    loader: verifySession,
    element: <ProtectedRoutes />,
    HydrateFallback: PageLoader,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/links",
            element: <LinksPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: "/preview",
        element: <PreviewPage />,
      },
    ],
  },

  // Public routes
  {
    element: <PublicRoutes />,
    HydrateFallback: PageLoader,
    children: [
      {
        path: "/public/profile/:id",
        element: <PublicProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
