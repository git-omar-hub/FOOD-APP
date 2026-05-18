import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFood_list] = useState([]);
  const url = "https://food-app-eta-lemon.vercel.app";
  const [token, setToken] = useState("");

  const getFoodList = () => {
    axios
      .get(`${url}/api/food/list`)
      .then((res) => {
        setFood_list(res.data.data);
      })
      .catch((err) => alert(err));
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios
        .post(`${url}/api/cart/add`, { itemId }, { headers: { token } })
        .catch((err) => console.log(err));
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios
        .post(`${url}/api/cart/remove`, { itemId }, { headers: { token } })
        .catch((err) => console.log(err));
    }
  };

  const loadCartData = async (token) => {
    await axios
      .post(`${url}/api/cart/get`, {}, { headers: { token } })
      .then((res) => {
        setCartItems(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  useEffect(() => {
    (async () => {
      await getFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    })();
  }, []);
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
