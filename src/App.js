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
import OrderHistory from "./components/OrderHistory";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="checkout" element={<Checkout />}></Route>
      <Route path="account" element={<UserLayout />}></Route>
      <Route path="shop" element={<Shop />}></Route>
      <Route path="*" element={<NotFound />}></Route>
      <Route path="account/orders" element={<OrderHistory />}></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
