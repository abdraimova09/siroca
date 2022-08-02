import { Container } from "@mui/material";
import React from "react";
import OrdersTable from "../components/OrdersTable/OrdersTable";

const OrdersPage = () => {
  return (
    <Container>
      <OrdersTable />
    </Container>
  );
};

export default OrdersPage;
