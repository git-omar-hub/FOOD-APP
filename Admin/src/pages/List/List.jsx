import "./List.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const res = await axios.get(`${url}/api/food/list`);

    if (res.data.success) {
      setList(res.data.data);
    } else {
      toast.error("Error gettig food list");
    }
  };

  const removeFood = async (foodId) => {
    axios
      .post(`${url}/api/food/remove`, {
        id: foodId,
      })
      .then((res) => {
        toast.success(`${res.data.data.name} removed successfuly`);
        fetchList();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error removing food");
      });
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((e, i) => {
          return (
            <div key={i} className="list-table-format">
              <img src={e.image} alt="" />
              <p>{e.name}</p>
              <p>{e.category}</p>
              <p>{e.price}</p>
              <p onClick={() => removeFood(e._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
