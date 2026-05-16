import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { food_list as localFoodList } from "../../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFood_list] = useState(localFoodList);
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");

  const getFoodList = () => {
    axios
      .get(`${url}/api/food/list`)
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setFood_list(res.data.data);
        }
      })
      .catch(() => {});
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    toast.success("Added to cart");
    if (token) {
      await axios
        .post(`${url}/api/cart/add`, { itemId }, { headers: { token } })
        .catch(() => toast.error("Failed to sync cart"));
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    toast("Removed from cart");
    if (token) {
      await axios
        .post(`${url}/api/cart/remove`, { itemId }, { headers: { token } })
        .catch(() => toast.error("Failed to sync cart"));
    }
  };

  const loadCartData = async (token) => {
    await axios
      .post(`${url}/api/cart/get`, {}, { headers: { token } })
      .then((res) => {
        setCartItems(res.data.data);
      })
      .catch(() => toast.error("Failed to load cart"));
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
