import {
  CASE_GET_ORDERS_ERROR,
  CASE_GET_ORDERS_LOADING,
  CASE_GET_ORDERS_SUCCESS,
} from "./actions";

export function reducer(state, action) {
  switch (action.type) {
    case CASE_GET_ORDERS_SUCCESS:
      return {
        ...state,
        ordersData: action.payload.dataObjects,
        ordersCount: action.payload.count,
      };
    case CASE_GET_ORDERS_LOADING:
      return { ...state, ordersLoading: action.payload };
    case CASE_GET_ORDERS_ERROR:
      return { ...state, ordersError: action.payload };
    default:
      return state;
  }
}
