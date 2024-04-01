
import "./App.scss"
import { useLocation } from "react-router-dom";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Orders from "./pages/orders/Orders";
import MyGigs from "./pages/myGigs/MyGigs";
import Add from "./pages/add/Add";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import {
  QueryClient,
  QueryClientProvider,
  //  useQuery,
} from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient()

  const Layout = () => {
    const { pathname } = useLocation();
    var shouldRenderNavbarAndFooter = pathname !== "/login" && pathname !== "/register"

    return (
      <div className="layout">
        <QueryClientProvider client={queryClient}>
          {shouldRenderNavbarAndFooter && <Navbar />}
          <Outlet />
          {shouldRenderNavbarAndFooter && <Footer />}
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/gigs", element: <Gigs /> },
        { path: "/gig/:id", element: <Gig /> },
        { path: "/orders", element: <Orders /> },
        { path: "/mygigs", element: <MyGigs /> },
        { path: "/add", element: <Add /> },
        { path: "/messages", element: <Messages /> },
        { path: "/message/:id", element: <Message /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> }
      ]
    }
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;