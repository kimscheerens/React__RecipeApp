import React from "react";
import Favorites from "../Recipe/Favorites";
import RecipeList from "../Recipe/RecipeList";
import {AnimatedOnScroll} from "react-animate-on-scroll";

function Home() {
  return (
    <>
      <main className="hero">
      {/* <AnimatedOnScroll animationIn="bounceInRight" 
        style={{marginTop:"80px",color:"green"}}> */}
          <h1 className="hero__title">Family Food App</h1>
        {/* </AnimatedOnScroll> */}
        <div className="app__recipes"></div>
      </main>
      <RecipeList />
      <Favorites />
    </>
  );
}

export default Home;
