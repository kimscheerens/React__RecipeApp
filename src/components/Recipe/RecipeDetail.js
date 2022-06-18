import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaSleigh } from "react-icons/fa";
import { deleteItem, writeShoppingItem, writeFavoItem, writeCalendarItem } from "../../utils/crud";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useParams } from "@gatsbyjs/reach-router";
import { UseCountingPeople } from "./UseCountingPeople";
import Modal from "./Modal";
/** https://www.npmjs.com/package/react-datepicker */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function RecipeDetail() {
  /**add to calendar */
  const [startDate, setStartDate] = useState(new Date());
  const [amountOfPersons, setAmountOfPersons] = useState(2);

  /** how to get the detail of the recipe */
  const [recipeDetail, setRecipeDetails] = useState(null);
  const { recipeid } = useParams();

  /**how to open the modal to update the recipe */
  const [openModal, setOpenModal] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(null);

  /** vieuw ingrediënts or steps  */
  const [openViewIngredients, setOpenViewIngredients] = useState(false);

  useEffect(() => {
    const oneRecipeRef = doc(db, "recept", recipeid);
    onSnapshot(oneRecipeRef, doc => {
      setRecipeDetails(doc.data());
    });
  }, [recipeDetail]);

  if (!recipeDetail) {
    // console.log("no recipe set");
    return <div>id='{recipeid}'</div>;
  }

  const handleDateSelect = e => {
    console.log(e);
  };

  return (
    <section className="recipeDetail">
      <h2 className="recipeDetail__title"> Detail recipe:</h2>

      <div className="recipeDetail__container">
        <div key={recipeDetail.recipeid}> </div>
        <h3 className="recipeDetail__subtitle">{recipeDetail.title}</h3>
        <div className="recipeDetail__desc">{recipeDetail.desc}</div>
        <img className="recipeDetail__img" src={recipeDetail.imageUrl} alt="image of the recipe"></img>
        <div className="recipeDetail__content">
          <button className="recipeDetail__btn" onClick={() => deleteItem(recipeDetail.id)}>
            🗑️
          </button>
          <button className="recipeDetail__btn" onClick={() => setOpenModal(true)} recipeToEdit={recipeToEdit} setRecipeToEdit={setRecipeToEdit}>
            ✏️
          </button>
          {openModal && <Modal closeModal={setOpenModal} recipeDetailid={recipeDetail} />}
          <button className="recipeDetail__btn">
            <FaRegHeart onClick={() => writeFavoItem(recipeDetail)}></FaRegHeart>
          </button>
          {/* <button className="recipeDetail__btn-date">
            <DatePicker
              className="recipeDetail__btn-detail"
              selected={startDate}
              onChange={date => setStartDate(date)}
              onSelect={handleDateSelect} //when day is clicked
              onClick={() => writeCalendarItem(recipeDetail)}
            />
          </button> */}
        </div>
        <div className="Detail">
          <aside className="recipeDetail__aside">
            <span className="aside__time">
              Preparation time: {recipeDetail.time}
              <i>⏱️</i>
            </span>
            <UseCountingPeople amountOfPersons={amountOfPersons} setAmountOfPersons={setAmountOfPersons} />
            <span className="aside__price">Price: {recipeDetail.price * amountOfPersons} €</span>
          </aside>
          <div className="recipeDetail-container">
            {openViewIngredients ? (
              ""
            ) : (
              <li>
                <h4 className="recipeDetail__ingredients" id="ingredients" onClick={() => setOpenViewIngredients(true)}>
                  INGREDIENTS
                  <h3 className="recipeDetail__changeTitle">Preparation</h3>
                </h4>
                <button
                  className="button-shop"
                  recipeShop={recipeDetail.ingredients}
                  onClick={() => {
                    writeShoppingItem(recipeDetail);
                  }}
                >
                  🛒
                </button>
                <div className="recipeDetail__ingredients__container">
                  {recipeDetail.ingredients.map((ingredient, i) => (
                    <ul className="recipeDetail__ingredients__list" key={i}>
                      <li className="recipeDetail__ingredients__list-item-ing">{ingredient.ingredient}</li>
                      <li className="recipeDetail__ingredients__list-item">{ingredient.amount * amountOfPersons}</li>
                      <li className="recipeDetail__ingredients__list-item">{ingredient.unit}</li>
                    </ul>
                  ))}
                </div>
              </li>
            )}

            {openViewIngredients && (
              <li className="recipeDetail-container__list-two">
                <h4 className="recipeDetail__ingredients" id="ingredients" onClick={() => setOpenViewIngredients(false)}>
                  PREPARATION
                  <h3 className="recipeDetail__changeTitle">ingredients</h3>
                </h4>
                <ol className="recipeDetail-container__steps">
                  {recipeDetail.steps.map((step, i) => (
                    <li key={i} className="recipeDetail-container__list">
                      {step}
                    </li>
                  ))}
                </ol>
              </li>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecipeDetail;
