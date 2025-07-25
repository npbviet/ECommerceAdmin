import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import Layout from "./layout/Layout";
import DashBoard from "./Pages/DashBoard";
import OrderDetail from "./features/dashboard/OrderDetail";
import Chat from "./Pages/Chat";
import Product from "./Pages/Product";
import NewProduct from "./features/product/NewProduct";
import EditProduct from "./features/product/EditProduct";

import { loginAction } from "./actions/formAction";
import { handlerForLoginRouter } from "./loaders/routeProtection";
import { getActiveUserInforLoader } from "./loaders/userLoaders";
import { loaderForDashBoard } from "./loaders/dashboardLoader";
import {
  loaderForProducts,
  loaderForProductById,
} from "./loaders/productLoaders";
import { loaderForChatPage } from "./loaders/chatLoader";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

library.add(fab, fas, far);

const route = createBrowserRouter([
  {
    path: "/admin/login",
    element: <Login />,
    action: loginAction,
    loader: handlerForLoginRouter,
  },
  {
    path: "/",
    // errorElement: <ErrorPage />,
    element: <Layout />,
    loader: getActiveUserInforLoader,
    children: [
      {
        path: "",
        element: <DashBoard />,
        loader: loaderForDashBoard,
      },
      {
        path: "/order-detail",
        element: <OrderDetail />,
        loader: loaderForDashBoard,
      },
      {
        path: "/chat",
        element: <Chat />,
        loader: loaderForChatPage,
      },
      {
        path: "products",
        element: <Product />,
        loader: loaderForProducts,
      },
      {
        path: "products/new-product",
        element: <NewProduct />,
        loader: loaderForProducts,
      },
      {
        path: "products/:productID",
        element: <EditProduct />,
        loader: loaderForProductById,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
