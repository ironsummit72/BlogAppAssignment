import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import Login from "./pages/LoginPage/Login.jsx";
import Register from "./pages/Register.jsx";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";
import MyBlogs from "./pages/MyBlogs.jsx";
import ProtectedRoute from "./Auth/ProtectedRoute.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import BlogFeed from "./pages/BlogFeed.jsx";
import ViewBlog from "./pages/ViewBlog.jsx";
import EditBlog from "./pages/EditBlog.jsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/myblogs",
        element: (
          <ProtectedRoute>
            <MyBlogs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <BlogFeed />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-blog",
        element: (
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-blog/:id",
        element: (
          <ProtectedRoute>
            <EditBlog />
          </ProtectedRoute>
        ),
      },

      {
        path:'/blog/:id',
        element:<ProtectedRoute><ViewBlog/></ProtectedRoute>
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </Provider>
);
