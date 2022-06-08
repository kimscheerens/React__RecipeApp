import React, { useEffect, useState } from "react";
import { BsThreeDots as Dots } from "react-icons/bs";
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
import Modal from "./Modal";
/** https://www.npmjs.com/package/react-datepicker */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function RecipeDetail() {
  /**add to calendar */
  const [startDate, setStartDate] = useState(new Date());

  /** how to get the detail of the recipe */
  const [recipeDetail, setRecipeDetails] = useState(null);
  const { recipeid } = useParams();

  /**how to open the modal to update the recipe */
  const [openModal, setOpenModal] = useState(false);

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

  const handleDateSelect = (e) => {
    console.log(e);
  };

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
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                ✏️
              </button>
              {openModal && (
                <Modal
                  closeModal={setOpenModal}
                  recipeDetailid={recipeDetail}
                />
              )}
              <button className="recipeDetail__btn">
                <FaRegHeart
                  onClick={() => writeFavoItem(recipeDetail)}
                ></FaRegHeart>
              </button>
              <button className="recipeDetail__btn-date">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  onSelect={handleDateSelect} //when day is clicked
                />
              </button>
            </div>
            <div className="Detail">
              <aside className="recipeDetail__aside">
                <span className="aside__time">
                  Preparation time: {recipeDetail.time}
                  <i>⏱️</i>
                </span>
                <CountingPersons className="aside__persons" />
                <span className="aside__price">
                  Price: {recipeDetail.price} €
                </span>
              </aside>
              <div className="recipeDetail-container">
                <li>
                  <h4 id="ingredients">INGREDIENTS</h4>
                  <div>
                    {recipeDetail.ingredients.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </div>
                </li>
                <li className="recipeDetail-container__list-two">
                  <h4 id="preparation">PREPARATION</h4>
                  <h5>Steps</h5>
                  <ol>
                    {recipeDetail.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </li>
              </div>
            </div>
          </div>
        </>
      </div>
    </section>
  );
}

export default RecipeDetail;
