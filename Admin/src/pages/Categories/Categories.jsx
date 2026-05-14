import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import "./Categories.css";

const Categories = ({ url }) => {
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState("");

  const fetch = async () => {
    const res = await axios.get(`${url}/api/category/list`);
    if (res.data.success) setCategories(res.data.data);
  };

  const add = async () => {
    if (!newName.trim()) return toast.error("Enter a category name");
    const res = await axios.post(`${url}/api/category/add`, { name: newName });
    if (res.data.success) { toast.success("Category added"); setNewName(""); fetch(); }
    else toast.error(res.data.message);
  };

  const remove = async (id) => {
    const res = await axios.post(`${url}/api/category/remove`, { id });
    if (res.data.success) { toast.success("Category removed"); fetch(); }
    else toast.error(res.data.message);
  };

  useEffect(() => { fetch(); }, []);

  return (
    <div className="categories">
      <h2>Categories</h2>
      <div className="categories-input">
        <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="New category name" />
        <button onClick={add}>Add</button>
      </div>
      <div className="categories-list">
        {categories.map((c) => (
          <div key={c._id} className="categories-item">
            <span>{c.name}</span>
            <button onClick={() => remove(c._id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
