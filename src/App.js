//import logo from "./logo.svg";
//import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Checkout from "./components/Checkout";
import UserLayout from "./layouts/UserLayout";
import Shop from "./components/Shop";
import NotFound from "./components/NotFound";
import OrderHistory from "./components/account/OrderHistory";
import AccountDetails from "./components/account/AccountDetails";
import Payments from "./components/account/Payments";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="checkout" element={<Checkout />} />
      <Route path="shop" element={<Shop />} />
      <Route path="*" element={<NotFound />} />
      <Route path="account" element={<UserLayout />}>
        <Route path="orders" element={<OrderHistory />} />
        <Route path="details" element={<AccountDetails />} />
        <Route path="payments" element={<Payments />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
