import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../EmptyState/EmptyState";
import "./Addresses.css";

const Addresses = () => {
  const { url, token } = useContext(StoreContext);
  const [addresses, setAddresses] = useState([]);
  const navegate = useNavigate();

  const fetch = async () => {
    const res = await axios.post(`${url}/api/address/list`, {}, { headers: { token } });
    if (res.data.success) setAddresses(res.data.data);
  };

  const remove = async (id) => {
    const res = await axios.post(`${url}/api/address/remove`, { id }, { headers: { token } });
    if (res.data.success) { toast.success("Address removed"); fetch(); }
    else toast.error(res.data.message);
  };

  useEffect(() => { if (token) fetch(); }, [token]); // eslint-disable-line

  return (
    <div className="addresses-page">
      <h2>Saved Addresses</h2>
      <button className="addresses-add" onClick={() => navegate("/order")}>+ Add New Address</button>
      {addresses.length === 0 ? (
        <EmptyState icon="📍" title="No saved addresses" message="Add one during checkout and it'll be saved here" />
      ) : (
        <div className="addresses-list">
          {addresses.map((a) => (
            <div key={a._id} className="address-item">
              <span className="address-item__label">{a.label}</span>
              <p>{a.fristName} {a.lastName}</p>
              <p>{a.street}, {a.city}, {a.state} {a.zipcode}</p>
              <p>{a.country} — {a.phone}</p>
              <button onClick={() => remove(a._id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
