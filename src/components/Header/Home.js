import React, { useState } from "react";
import Favorites from "../Recipe/Favorites";
import RecipeList from "../Recipe/RecipeList";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const [input, setInput] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("hello");
  };

  return (
    <>
      <main className="hero">
        <h1 className="hero__title">Food App</h1>
        <div onSubmit={submitHandler}>
          <div className="hero__searchbar">
            {/* <FaSearch className="hero__searchicon"> </FaSearch>
            <input
              onChange={(e) => setInput(e.target.value)}
              type="text"
              value={input}
            /> */}
          </div>
        </div>
        <div className="app__recipes"></div>
      </main>
      <RecipeList />
      <Favorites />
    </>
  );
};

export default Home;
