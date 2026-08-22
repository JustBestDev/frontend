import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Temples from "../pages/Temples";
import Favorites from "../pages/Favorites";
import Profile from "../pages/Profile";
import TempleDetail from "../pages/TempleDetail";
import FortuneResult from "../pages/FortuneResult";
import MyHistory from "../pages/MyHistory";
import EditProfile from "../pages/EditProfile";
import useUserStore from "../stores/userStore";

function ProtectedRoute({ children }) {
  const token = useUserStore((state) => state.token);
  return token ? children : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, Component: Home },

      { path: "temples", Component: Temples },
      { path: "favorites", Component: Favorites },
      { path: "profile", Component: Profile },
    ],
  },

  { path: "/temples/:templeId", Component: TempleDetail },
  { path: "/fortune-result", Component: FortuneResult },
  { path: "/fortune-result/:historyId", Component: FortuneResult },
  {
    path: "/my-history",
    element: (
      <ProtectedRoute>
        <MyHistory />
      </ProtectedRoute>
    ),
  },

  {
    path: "/profile/edit",
    element: (
      <ProtectedRoute>
        <EditProfile />
      </ProtectedRoute>
    ),
  },

  { path: "/login", Component: Login },
  { path: "/register", Component: Register },

  { path: "*", element: <Navigate to="/" replace /> },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
