import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import MenuLayout from "./Components/MenuLayout";
import Dashboard from "./Components/Dashboard";
import CustomerList from "./Components/CustomerList";
import ItemList from "./Components/ItemList";
import Order from "./Components/Order.Jsx";
import OrderCreate from "./Components/OrderCreate";
import "./App.css";
import Users from "./Components/Users";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/menu" element={<MenuLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="items" element={<ItemList />} />
          <Route path="orders" element={<Order />} />
          <Route path="/menu/orders/create" element={<OrderCreate />} />
          <Route path="/menu/orders/create/:id" element={<OrderCreate />} />
          <Route path="Users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
