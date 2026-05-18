import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import "./Coupons.css";

const Coupons = ({ url }) => {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({ code: "", discount: "", type: "percentage", minAmount: 0, maxUses: 0 });
  const [showForm, setShowForm] = useState(false);

  const fetch = async () => {
    const res = await axios.get(`${url}/api/coupon/list`);
    if (res.data.success) setCoupons(res.data.data);
  };

  const add = async () => {
    if (!form.code || !form.discount) return toast.error("Code and discount required");
    const res = await axios.post(`${url}/api/coupon/add`, form);
    if (res.data.success) { toast.success("Coupon created"); setShowForm(false); setForm({ code: "", discount: "", type: "percentage", minAmount: 0, maxUses: 0 }); fetch(); }
    else toast.error(res.data.message);
  };

  const remove = async (id) => {
    const res = await axios.post(`${url}/api/coupon/remove`, { id });
    if (res.data.success) { toast.success("Coupon removed"); fetch(); }
  };

  useEffect(() => { fetch(); }, []);

  return (
    <div className="coupons">
      <div className="coupons-header">
        <h2>Coupons</h2>
        <button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "New Coupon"}</button>
      </div>
      {showForm && (
        <div className="coupons-form">
          <input placeholder="Code" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} />
          <input placeholder="Discount" type="number" value={form.discount} onChange={e => setForm({ ...form, discount: e.target.value })} />
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>
          <input placeholder="Min amount" type="number" value={form.minAmount} onChange={e => setForm({ ...form, minAmount: e.target.value })} />
          <input placeholder="Max uses (0 = unlimited)" type="number" value={form.maxUses} onChange={e => setForm({ ...form, maxUses: e.target.value })} />
          <button onClick={add}>Create</button>
        </div>
      )}
      <div className="coupons-list">
        {coupons.map((c) => (
          <div key={c._id} className="coupons-item">
            <div>
              <strong>{c.code}</strong> — {c.type === "percentage" ? `${c.discount}%` : `$${c.discount}`} off
              <span className="coupons-item__meta">Used {c.usedCount}{c.maxUses > 0 ? `/${c.maxUses}` : ""}</span>
            </div>
            <button onClick={() => remove(c._id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coupons;
