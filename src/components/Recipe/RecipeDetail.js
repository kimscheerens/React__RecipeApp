import React, { useEffect } from "react";
import { BsThreeDots as Dots } from "react-icons/bs";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { updateIngredientsByPersons } from "./VariablesRecipe";
import {
  deleteItem,
  updateRecipe,
  writeFavoItem,
  writeCalendarItem,
} from "../../utils/crud";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useParams } from "@gatsbyjs/reach-router";
import CountingPersons from "./CountingPersons";

function RecipeDetail() {
  const [recipeDetail, setRecipeDetails] = useState(null);
  const { recipeid } = useParams();

  useEffect(() => {
    const oneRecipeRef = doc(db, "recept", recipeid);
    onSnapshot(oneRecipeRef, (doc) => {
      setRecipeDetails(doc.data());
    });
  }, [recipeDetail]);

  if (!recipeDetail) {
    // console.log("no recipe set");
    return <div>id='{recipeid}'</div>;
  }

  // to get more of the recipe
  const handleView = (id) => {
    const recipesClone = [...recipeDetail];

    recipesClone.forEach((recipe) => {
      if (recipe.id === id) {
        recipe.viewing = !recipe.viewing;
      } else {
        recipe.viewing = false;
      }
    });
    setRecipeDetails(recipesClone);
  };

  // const getRecipe = (e) => {
  //   setRecipeDetails(e.target.value);
  //   console.log(e.target.value);
  // };

  return (
    <section className="recipeDetail">
      <h2 className="recipeDetail__title"> Detail recipe:</h2>
      <div>
        <>
          <div className="recipeDetail__container">
            <div key={recipeDetail.recipeid}> </div>
            <h3 className="recipeDetail__subtitle">{recipeDetail.title}</h3>
            <div className="recipeDetail__desc">{recipeDetail.desc}</div>
            <img
              className="recipeDetail__img"
              src={recipeDetail.imageUrl}
              alt="image of the recipe"
            ></img>
            <div className="recipeDetail__content">
              <button
                className="recipeDetail__btn"
                onClick={() => deleteItem(recipeDetail.id)}
              >
                🗑️
              </button>
              <button
                className="recipeDetail__btn"
                onClick={() => updateRecipe(recipeDetail.id, {})}
              >
                ✏️
              </button>
              <button className="recipeDetail__btn">
                <FaRegHeart
                  onClick={() => writeFavoItem(recipeDetail)}
                ></FaRegHeart>
              </button>
              <button
                className="recipe-item__btn"
                onClick={() => writeCalendarItem(recipeDetail, recipeDetail.id)}
              >
                <Dots className="dots" />
              </button>
            </div>
            <div className="Detail">
              <aside className="aside">
                <span className="aside__time">
                  Preparation time: {recipeDetail.time}
                  <i>⏱️</i>
                </span>
                <CountingPersons className="aside__persons" />
                <span className="aside__price">
                  Price: {recipeDetail.price} €
                </span>
              </aside>
              <div className="cont_over_hidden">
                <div className="cont_tabs">
                  <ul>
                    <li>
                      <h4>INGREDIENTS</h4>
                      <div className="cont_text_ingredients">
                        {recipeDetail.ingredients.map((ingredient, i) => (
                          <li key={i}>{ingredient}</li>
                        ))}
                      </div>
                    </li>
                    <li>
                      <h4>PREPARATION</h4>
                    </li>
                  </ul>
                </div>
                <div className="cont_text_det_preparation">
                  <h4 className="cont_title_preparation">Steps</h4>
                </div>
                <div className="cont_info_preparation">
                  <ol className="cont_text_det_preparation">
                    {recipeDetail.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </section>
  );
}

export default RecipeDetail;
