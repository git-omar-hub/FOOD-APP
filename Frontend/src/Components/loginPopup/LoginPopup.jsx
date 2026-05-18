import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";
import { assets } from "../../assets/assets";
import { StoreContext } from "../context/StoreContext";
import FormField from "../FormField/FormField";
import PasswordStrength from "../PasswordStrength/PasswordStrength";
import "./LoginPopup.css";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

const signupSchema = loginSchema.extend({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),
});

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, cartItems } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const isSignUp = currState === "Sign Up";
  const schema = isSignUp ? signupSchema : loginSchema;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    const endpoint = isSignUp ? "/api/user/register" : "/api/user/login";
    try {
      const res = await axios.post(`${url}${endpoint}`, data);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowLogin(false);
        const hasLocalItems = Object.values(cartItems).some((q) => q > 0);
        if (hasLocalItems) {
          await axios.post(`${url}/api/cart/merge`, { items: cartItems }, { headers: { token: res.data.token } });
        }
        toast.success(isSignUp ? "Account created successfully" : "Logged in successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit(onSubmit)} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {isSignUp && (
            <FormField
              name="name"
              type="text"
              placeholder="Your name"
              register={register}
              error={errors.name}
            />
          )}
          <FormField
            name="email"
            type="email"
            placeholder="Your email"
            register={register}
            error={errors.email}
          />
          <FormField
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors.password}
          />
          {isSignUp && <PasswordStrength value={passwordValue || ""} />}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Please wait..." : isSignUp ? "Create account" : "Login"}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
          {isSignUp ? (
            <p>
              Already have an account{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          ) : (
            <p>
              Create a new account{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
