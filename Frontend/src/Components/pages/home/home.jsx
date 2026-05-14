import React, { useState } from "react";
import "./Home.css";
import Header from "../../Header/Header";
import ExploreMenu from "../../ExploreMenu/ExploreMenu";
import FoodDisplay from "../../foodDisplay/FoodDisplay";
import AppDownLoad from "../../AppDownLoad/AppDownLoad";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} search={search} />
      <AppDownLoad />
    </div>
  );
};

export default Home;
