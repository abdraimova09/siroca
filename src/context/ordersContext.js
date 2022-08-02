import React, { useContext, useReducer } from "react";
import axios from "axios";

export const ordersContext = React.createContext();
export function useOrdersContext() {
  return useContext(ordersContext);
}
const INIT_STATE = {
  ordersData: [],
  ordersCount: 0,
  ordersLoading: false,
  ordersError: null,
};
function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_ORDERS_SUCCESS":
      return {
        ...state,
        ordersData: action.payload.dataObjects,
        ordersCount: action.payload.count,
      };
    case "GET_ORDERS_LOADING":
      return { ...state, ordersLoading: action.payload };
    case "GET_ORDERS_ERROR":
      return { ...state, ordersError: action.payload };
    default:
      return state;
  }
}
const OrdersContextProvider = ({ children }) => {
  const BASE_URL = "http://212.112.102.2:5666/api";
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  async function getOrders() {
    // dispatch({
    //   type: "GET_ORDERS_LOADING",
    //   payload: true,
    // });
    try {
      let response = await axios(
        `${BASE_URL}/orders/researches-with-prices${window.location.search}`
      );
      dispatch({
        type: "GET_ORDERS_SUCCESS",
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: "GET_ORDERS_ERROR",
        payload: err.message,
      });
    } finally {
      dispatch({
        type: "GET_ORDERS_LOADING",
        payload: false,
      });
    }
  }

  return (
    <ordersContext.Provider
      value={{
        ordersData: state.ordersData,
        ordersCount: state.ordersCount,
        ordersLoading: state.ordersLoading,
        ordersError: state.ordersError,
        getOrders,
      }}>
      {children}
    </ordersContext.Provider>
  );
};
export default OrdersContextProvider;
