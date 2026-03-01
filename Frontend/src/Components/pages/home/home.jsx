import React, { useState } from "react";
import "./Home.css";
import Header from "../../Header/Header";
import ExploreMenu from "../../ExploreMenu/ExploreMenu";
import FoodDisplay from "../../foodDisplay/FoodDisplay";
import AppDownLoad from "../../AppDownLoad/AppDownLoad";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownLoad />
    </div>
  );
};

export default Home;
