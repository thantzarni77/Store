import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./layout/Login";
import Main from "./layout/Main";
import Items from "./pages/Items";
import AddUser from "./pages/AddUser";
import ItemDetail from "./pages/ItemDetail";
import AddItem from "./pages/AddItem";
import Customers from "./pages/Customers";
import CustomerDetail from "./pages/CustomerDetail";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "/items",
          element: <Items />,
        },
        {
          path: "/item/:id",
          element: <ItemDetail />,
        },
        {
          path: "/additem",
          element: <AddItem />,
        },
        {
          path: "/customers",
          element: <Customers />,
        },
        {
          path: "/addcustomer",
          element: <AddUser />,
        },
        {
          path: "/customer/:id",
          element: <CustomerDetail />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
