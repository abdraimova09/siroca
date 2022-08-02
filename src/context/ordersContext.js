import React, { useContext, useReducer } from "react";
import axios from "axios";
import { reducer } from "./reducer";
import {
  CASE_GET_ORDERS_ERROR,
  CASE_GET_ORDERS_LOADING,
  CASE_GET_ORDERS_SUCCESS,
} from "./actions";
import { INIT_STATE } from "./states";
import { BASE_URL } from "../helpers/consts";

export const ordersContext = React.createContext();

const OrdersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  async function getOrders() {
    try {
      let response = await axios(
        `${BASE_URL}/orders/researches-with-prices${window.location.search}`
      );
      dispatch({
        type: CASE_GET_ORDERS_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: CASE_GET_ORDERS_ERROR,
        payload: err.message,
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
