import axios from "axios";

export const GOT_PRODUCT = "GOT_PRODUCT";
export const GOT_PRODUCTS = "GOT_PRODUCTS";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

function _createProduct(product) {
  return {
    type: CREATE_PRODUCT,
    product,
  };
}
function _editProduct(product) {
  return {
    type: EDIT_PRODUCT,
    product,
  };
}
function _deleteProduct(id) {
  return {
    type: DELETE_PRODUCT,
    id,
  };
}

export function createProduct(product) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post("/api/products", product, {
        headers: { authorization: localStorage.getItem("token") },
      });
      dispatch(_createProduct(data));
      // history.push("/products");
    } catch (err) {
      console.error(err);
    }
  };
}
export function editProduct(id, product) {
  return async function (dispatch) {
    try {
      const { data } = await axios.put(
        `http://localhost:3001/api/products/${id}`,
        product,
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );
      dispatch(_editProduct(data));
      // history.push("/products");
    } catch (err) {
      console.error(err);
    }
  };
}
export function deleteProduct(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { authorization: localStorage.getItem("token") },
      });
      dispatch(_deleteProduct(id));
    } catch (err) {
      console.error(err);
    }
  };
}

export function gotProducts(products) {
  return {
    type: GOT_PRODUCTS,
    products,
  };
}

export function gotProduct(product) {
  return {
    type: GOT_PRODUCT,
    product,
  };
}

export function getProducts() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://localhost:3001/api/products`);
      dispatch(gotProducts(data));
    } catch (err) {
      console.error(err);
    }
  };
}

export function getProduct(productId) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      dispatch(gotProduct(data));
    } catch (error) {
      console.error(error);
    }
  };
}

export const productState = { allProducts: [], singleProduct: {} };

//This is getting the state from the component, not the productState above.
export const productReducer = (state, action) => {
  switch (action.type) {
    case GOT_PRODUCT:
      console.log(state);
      return { ...state, singleProduct: { ...action.product } };
    case GOT_PRODUCTS:
      return { ...state, allProducts: [...action.products] };
    case CREATE_PRODUCT:
      return [
        ...state,
        {
          name: action.product.name,
          id: action.product.id,
          description: action.product.description,
          price: action.product.price,
        },
      ];
    case DELETE_PRODUCT:
      console.log("State: ", state);
      console.log("Action ", action);
      console.log({
        ...state,
        allProducts: state.allProducts.filter(
          (product) => product.id !== action.product.id
        ),
      });
      return {
        ...state,
        allProducts: state.allProducts.filter(
          (product) => product.id !== action.product.id
        ),
      };
    case EDIT_PRODUCT:
      return;
    default:
      return state;
  }
};
