import React from "react";
import Favorites from "../Recipe/Favorites";
import RecipeList from "../Recipe/RecipeList";

function Home() {
  return (
    <>
      <main className="hero">    
          <h1 className="hero__title">Family Food App</h1>
        <div className="app__recipes"></div>
      </main>
      <RecipeList />
      <Favorites/>
    </>
  );
}

export default Home;
