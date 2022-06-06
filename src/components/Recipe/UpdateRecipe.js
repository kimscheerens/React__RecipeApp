import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UpdateRecipe = ({ recipeId, setRecipeToEdit, recipeDetail }) => {
  const [newTitle, setNewTitle] = useState(recipeDetail.title);
  console.log(recipeDetail.title);

  const [newDescription, setNewDescription] = useState(
    recipeDetail.description
  );
  console.log(recipeDetail.description);

  const handleEdit = async (recipeId) => {
    await updateDoc(doc(db, "recept", recipeId), {
      title: newTitle,
      description: newDescription,
    });
  };
  //if (!task) return null;

  return (
    <div className="recipeDetail__container">
      <div key={recipeDetail.recipeid}> </div>
      <h3 className="recipeDetail__subtitle">title: </h3>
      <input
        type="text"
        defaultValue={recipeDetail.title}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input
        className="recipeDetail__desc"
        type="text"
        defaultValue={recipeDetail.desc}
        placeholder="description"
        onChange={(e) => {
          setNewDescription(e.target.value);
        }}
      />
      {/* <img
        className="recipeDetail__img"
        src={recipeDetail.imageUrl}
        alt="image of the recipe"
      ></img>
      <button
        className="recipeDetail__btn"
        onClick={() => {
          handleEdit(recipeId);
          setRecipeToEdit(null);
        }}
      >
        Update ✏️
      </button>
      <div className="Detail">
        <aside className="aside">
          <span className="aside__time">
            Preparation time: {recipeDetail.time}
            <i>⏱️</i>
          </span>
          <span className="aside__price">Price: {recipeDetail.price} €</span>
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
      </div> */}
    </div>
  );
};

export default UpdateRecipe;
