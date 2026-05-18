import React, { useContext, useState } from "react";
import "./Home.css";
import Header from "../../Header/Header";
import ExploreMenu from "../../ExploreMenu/ExploreMenu";
import FoodDisplay from "../../foodDisplay/FoodDisplay";
import AppDownLoad from "../../AppDownLoad/AppDownLoad";
import { StoreContext } from "../../context/StoreContext";

const Home = () => {
  const [category, setCategory] = useState("All");
  const { searchQuery } = useContext(StoreContext);
  const isSearching = (searchQuery || "").trim().length > 0;

  return (
    <div>
      {!isSearching && <Header />}
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      {!isSearching && <AppDownLoad />}
    </div>
  );
};

export default Home;
