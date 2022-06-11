// everything for Styling components
import "./App.css";
import "../src/styling/main.css";
import "../src/components/Header/header.css";
import "../src/components/Recipe/Styling/recipe.css";
import "../src/components/Recipe/Styling/favorites.css";
import "../src/components/Recipe/Styling/recipeDetail.css";
import "../src/components/RecipeAside/Styling/RecipeAside.css";
import "../src/components/ShoppingList/Shopping.css";
import "../src/components/User/user.css";
import "../src/components/Calendar/WeekMenu.css";
import "../src/components/Restaurant/restaurant.css";

import React from "react";

// import all components
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import Shop from "./components/ShoppingList/Shop";
import Contact from "./components/Contact";
import Recipe from "./components/Recipe/Recipe";
import RecipeDetail from "./components/Recipe/RecipeDetail";
import WeekMenu from "./components/Calendar/WeekMenu";
import Home from "./components/Header/Home";
import Restaurant from "./components/Restaurant/Restaurant";
import CreateUser from "./components/User/CreateUser";
import Login from "./components/User/Login";
import Favorites from "./components/Recipe/Favorites";
import Overview from "./components/RecipeAside/Overview";

//import of packages
import { Router } from "@gatsbyjs/reach-router";
import { RecipeProvider } from "./context/RecipeContext";

function App() {
  return (
    <div className="App">
      <Header />
      <RecipeProvider>
        <Router className="container">
          <Home exact path="/" />
          <Recipe path="/RecipeList" />
          <RecipeDetail path="/recipe/:recipeid" />
          <Overview path="/Overview" />
          <Favorites path="/favorites" />
          <WeekMenu path="/RecipeList/WeekMenu" />
          <Shop path="/shop" />
          <Restaurant path="/restaurant" />
          <CreateUser path="/CreateUser" />
          <Login path="/Login" />
          <Contact path="/contact" />
        </Router>
      </RecipeProvider>
      <Footer />
    </div>
  );
}

export default App;
