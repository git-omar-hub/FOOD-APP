import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "sonner";
import EmptyState from "../../EmptyState/EmptyState";
import "./Addresses.css";

const Addresses = () => {
  const { url, token } = useContext(StoreContext);
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: "Home", firstName: "", lastName: "", email: "", street: "", city: "", state: "", zipcode: "", country: "", phone: "" });

  const fetch = async () => {
    const res = await axios.post(`${url}/api/address/list`, {}, { headers: { token } });
    if (res.data.success) setAddresses(res.data.data);
  };

  const remove = async (id) => {
    const res = await axios.post(`${url}/api/address/remove`, { id }, { headers: { token } });
    if (res.data.success) { toast.success("Address removed"); fetch(); }
    else toast.error(res.data.message);
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.street || !form.city || !form.phone) {
      return toast.error("Fill in required fields");
    }
    try {
      const res = await axios.post(`${url}/api/address/add`, form, { headers: { token } });
      if (res.data.success) {
        toast.success("Address saved");
        setShowForm(false);
        setForm({ label: "Home", firstName: "", lastName: "", email: "", street: "", city: "", state: "", zipcode: "", country: "", phone: "" });
        fetch();
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Failed to save address");
    }
  };

  useEffect(() => { if (token) fetch(); }, [token]); // eslint-disable-line

  return (
    <div className="addresses-page">
      <h2>Saved Addresses</h2>

      {!showForm ? (
        <button className="addresses-add" onClick={() => setShowForm(true)}>+ Add New Address</button>
      ) : (
        <form className="address-form" onSubmit={handleSubmit}>
          <h3>New Address</h3>
          <input name="label" placeholder="Label (Home, Work...)" value={form.label} onChange={handleChange} />
          <div className="address-form-row">
            <input name="firstName" placeholder="First name *" value={form.firstName} onChange={handleChange} required />
            <input name="lastName" placeholder="Last name *" value={form.lastName} onChange={handleChange} required />
          </div>
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="street" placeholder="Street *" value={form.street} onChange={handleChange} required />
          <div className="address-form-row">
            <input name="city" placeholder="City *" value={form.city} onChange={handleChange} required />
            <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
          </div>
          <div className="address-form-row">
            <input name="zipcode" placeholder="Zip code" value={form.zipcode} onChange={handleChange} />
            <input name="country" placeholder="Country" value={form.country} onChange={handleChange} />
          </div>
          <input name="phone" placeholder="Phone *" value={form.phone} onChange={handleChange} required />
          <div className="address-form-actions">
            <button type="submit" className="addresses-add">Save Address</button>
            <button type="button" className="address-form-cancel" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      {addresses.length === 0 && !showForm ? (
        <EmptyState icon="📍" title="No saved addresses" message="Add one above and it'll be saved for future orders" />
      ) : (
        <div className="addresses-list">
          {addresses.map((a) => (
            <div key={a._id} className="address-item">
              <span className="address-item__label">{a.label}</span>
              <p>{a.firstName || a.fristName} {a.lastName}</p>
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
