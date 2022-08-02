import React from "react";
import { BrowserRouter } from "react-router-dom";
import OrdersContextProvider from "./context/ordersContext";
import Routing from "./Routing";

const App = () => {
  return (
    <OrdersContextProvider>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </OrdersContextProvider>
  );
};

export default App;
