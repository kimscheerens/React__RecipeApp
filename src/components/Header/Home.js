import React from "react";
import Favorites from "../Recipe/Favorites";
import RecipeList from "../Recipe/RecipeList";

const Home = () => {
  return (
    <>
      <main className="hero">
        <h1 className="hero__title">Food App</h1>
        <div className="app__recipes"></div>
      </main>
      <RecipeList />
      <Favorites />
    </>
  );
};

export default Home;
