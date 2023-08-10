//Action constants.
const GOT_CART = "GOT_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const INCREASE_QTY = "INCREASE_QTY";
const DECREASE_QTY = "DECREASE_QTY";
const CLEAR_CART = "CLEAR_CART";
const PURCHASE_ORDER = "PURCHASE_ORDER";

//Has properties id, title, description, price, img, qty.
export const cartState = {
  cart: [],
};

//Reducer.
export const cartReducer = (state = cartState, action) => {
  switch (action.type) {
    case GOT_CART:
      return { ...state, cart: [...action.cart] };
    case ADD_TO_CART:
      return state;
    case REMOVE_FROM_CART:
      return state;
    case INCREASE_QTY:
      return state;
    case DECREASE_QTY:
      return state;
    case CLEAR_CART:
      return state;
    case PURCHASE_ORDER:
    default:
      return state;
  }
};
