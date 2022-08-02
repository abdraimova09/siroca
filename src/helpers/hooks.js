import { useContext } from "react";
import { ordersContext } from "../context/ordersContext";

export function useOrdersContext() {
  return useContext(ordersContext);
}
