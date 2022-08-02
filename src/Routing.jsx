import React from "react";
import { Route, Routes } from "react-router-dom";
import OrdersTable from "./components/OrdersTable/OrdersTable";
import OrdersPage from "./pages/OrdersPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<OrdersPage />} />
      <Route path="*" element={<h2>Not found</h2>} />
    </Routes>
  );
};

export default Routing;
