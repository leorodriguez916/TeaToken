//import logo from "./logo.svg";
//import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useContext } from "react";
import RootLayout from "./layouts/RootLayout";
import Home from "./components/Home";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import UserLayout from "./layouts/UserLayout";
import Products from "./components/Products";
import SingleProduct from "./components/SingleProduct";
import NotFound from "./components/NotFound";
import Users from "./components/account/Users";
import OrderHistory from "./components/account/OrderHistory";
import AccountDetails from "./components/account/AccountDetails";
import Payments from "./components/account/Payments";
import ProductContextProvider from "./contexts/productContext";
import CartContextProvider from "./contexts/cartContext";
import AppContextProvider from "./contexts/GlobalState";
import GlobalState from "./contexts/GlobalState";
import SingleUser from "./components/account/SingleUser";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<SingleProduct />} />
      <Route path="*" element={<NotFound />} />
      <Route path="account" element={<UserLayout />}>
        <Route path="orders" element={<OrderHistory />} />
        <Route path="details" element={<AccountDetails />} />
        <Route path="payments" element={<Payments />} />
        <Route path="users" element={<Users />}></Route>
        <Route path="users/:id" element={<SingleUser />} />
      </Route>
    </Route>
  )
);

const compose = (providers) =>
  providers.reduce((Prev, Curr) => ({ children }) => (
    <Prev>
      <Curr>{children}</Curr>
    </Prev>
  ));

const Provider = compose([CartContextProvider, ProductContextProvider]);

function App() {
  return (
    <GlobalState>
      <RouterProvider router={router} />
    </GlobalState>
  );
}

export default App;
