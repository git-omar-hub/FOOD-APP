import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import FormField from "../../FormField/FormField";
import "./PlaceOrder.css";

const deliverySchema = z.object({
  fristName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipcode: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
});

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const navegat = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(deliverySchema),
  });

  useEffect(() => {
    if (!token) {
      toast.error("Please sign in to checkout");
      navegat("/cart");
    } else if (getTotalCartAmount() === 0) {
      toast.error("Your cart is empty");
      navegat("/cart");
    }
  }, [token, getTotalCartAmount, navegat]);

  const onSubmit = async (data) => {
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast.error(response.data.message || "Failed to place order");
      }
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        toast.error("Backend is offline — please try again later");
      } else {
        toast.error(err.response?.data?.message || "Failed to place order");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <FormField
            name="fristName"
            placeholder="First name"
            register={register}
            error={errors.fristName}
          />
          <FormField
            name="lastName"
            placeholder="Last name"
            register={register}
            error={errors.lastName}
          />
        </div>
        <FormField
          name="email"
          type="email"
          placeholder="Email address"
          register={register}
          error={errors.email}
        />
        <FormField
          name="street"
          placeholder="Street"
          register={register}
          error={errors.street}
        />
        <div className="multi-fields">
          <FormField
            name="city"
            placeholder="City"
            register={register}
            error={errors.city}
          />
          <FormField
            name="state"
            placeholder="State"
            register={register}
            error={errors.state}
          />
        </div>
        <div className="multi-fields">
          <FormField
            name="zipcode"
            placeholder="Zip code"
            register={register}
            error={errors.zipcode}
          />
          <FormField
            name="country"
            placeholder="Country"
            register={register}
            error={errors.country}
          />
        </div>
        <FormField
          name="phone"
          placeholder="Phone"
          register={register}
          error={errors.phone}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </p>
            </div>
            <hr />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "PROCESSING..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
