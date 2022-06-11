import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../utils/firebase";
import { useParams } from "@gatsbyjs/reach-router";
import { v4 } from "uuid";

const Modal = ({ closeModal, recipeDetailid, setRecipeToEdit }) => {
  const { recipeId } = useParams();
  console.log(recipeId);
  console.log(recipeDetailid);

  const [newTitle, setNewTitle] = useState(recipeDetailid.title);
  const [newCategory, setNewCategory] = useState(recipeDetailid.category);
  const [newAllergie, setNewAllergie] = useState(recipeDetailid.allergies);
  const [newImg, setNewImg] = useState(recipeDetailid.imageUrl);
  const [newIngredients, setNewIngredients] = useState(
    recipeDetailid.ingredients
  );
  const [newPrice, setNewPrice] = useState(recipeDetailid.price);
  const [newTime, setNewTime] = useState(recipeDetailid.time);
  const [newSteps, setNewSteps] = useState(recipeDetailid.steps);
  const [newDescription, setNewDescription] = useState(recipeDetailid.desc);

  const handleEdit = async recipeDetailid => {
    await updateDoc(doc(db, "recept", recipeDetailid), {
      title: newTitle,
      category: newCategory,
      allergies: newAllergie,
      desc: newDescription,
      ingredients: newIngredients,
      imageUrl: newImg,
      price: newPrice,
      time: newTime,
      steps: newSteps,
    });
  };

  const uploadFile = async (e) => {
    let file = e.target.files[0];
    let fileRef = ref(
      storage,
      `Images/${v4()}_${recipeDetailid.imageUrl.name}`
    );
    const uploadTask = await uploadBytesResumable(fileRef, file);
    const photoURL = await getDownloadURL(fileRef).then((url) => {
      setNewImg(url);
    });
  };

  const handleChangeInput = (i, e) => {
    const values = [...newIngredients];
    newIngredients[i][e.target.name] = e.target.value;
    setNewIngredients(values);
  };

  // const handleAddIngredientField = (e) => {
  //   e.preventDefault();
  //   setNewIngredients([
  //     ...newIngredients,
  //     {
  //       ingredient: "",
  //       amount: "",
  //       unit: "",
  //     },
  //   ]);
  // };

  const handleAddIngredientField = (e) => {
    e.preventDefault();
    setNewIngredients([
      ...newIngredients,
      {
        ingredient: "",
        amount: "",
        unit: "",
      },
    ]);
  };

  const handleRemoveIngredientsField = (index) => {
    const values = [...newIngredients];
    values.splice(index, 1);
    setNewIngredients(values);
  };

  return (
    <div className="modalBackground">
      <div className="recipeUpdate">
        <button
          type="button"
          className="modal__btn"
          onClick={() => closeModal(false)}
        >
          x
        </button>
        <div key={recipeDetailid.recipeId}> </div>
        <h3 className="modal__subtitle">title: </h3>
        <input
          className="modal__input"
          type="text"
          placeholder={recipeDetailid.title}
          value={recipeDetailid.newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <h3 className="modal__subtitle"> Description:</h3>
        <input
          className="modal__input"
          type="text"
          value={recipeDetailid.newDescription}
          placeholder={recipeDetailid.desc}
          onChange={(e) => {
            setNewDescription(e.target.value);
          }}
        />
        <h3 className="modal__subtitle">category:</h3>
        <div className="form-group">
          <select
            className="modal__input"
            name="label"
            type="text"
            value={recipeDetailid.category}
            onChange={(e) => {
              setNewCategory(e.target.value);
            }}
          >
            <option className="select_box__text">Chose Dinner moment</option>
            <option className="select_box__text" value="Breakfast">
              breakfast
            </option>
            <option className="select_box__text" value="lunch">
              lunch
            </option>
            <option className="select_box__text" value="dinner">
              dinner
            </option>
            <option className="select_box__text" value="snacks">
              snacks
            </option>
          </select>
        </div>

        <div className="form-group">
          <label className="modal__subtitle">Allergies:</label>
          <div className="label__container">
            <input
              className="label-check__input"
              type="checkbox"
              name="allergies"
              value="nuts"
              onChange={(e) => {
                setNewAllergie(e.target.value);
              }}
            />
            <label className="label-check">nuts</label>

            <input
              className="label-check__input"
              type="checkbox"
              name="allergies"
              value="soja"
              onChange={(e) => {
                setNewAllergie(e.target.value);
              }}
            />
            <label className="label-check">soja</label>

            <input
              className="label-check__input"
              type="checkbox"
              name="allergies"
              value="milk"
              onChange={(e) => {
                setNewAllergie(e.target.value);
              }}
            />
            <label className="label-check">milk</label>
            <input
              className="label-check__input"
              type="checkbox"
              name="allergies"
              value="fish and shellfish"
              onChange={(e) => {
                setNewAllergie(e.target.value);
              }}
            />
            <label className="label-check">fish and shellfish</label>
          </div>
        </div>
        <div className="modal__imgGroup">
          <img
            src={recipeDetailid.imageUrl}
            alt="recipe"
            className="modal__img"
          />
          <div>
            <h3 className="modal__subtitle">Change image: </h3>
            <input
              type="file"
              name="file"
              onChange={uploadFile}
              className="modal__input"
            />
          </div>
        </div>

        <h3 className="modal__subtitle">Preparation time:</h3>
        <input
          type="numbre"
          name="time"
          className="modal__input"
          value={recipeDetailid.time}
          onChange={(e) => {
            setNewTime(e.target.value);
          }}
        />
        <h3 className="modal__subtitle">Price:</h3>
        <input
          type="text"
          name="price"
          className="modal__input"
          value={recipeDetailid.price}
          onChange={(e) => {
            setNewPrice(e.target.value);
          }}
        />
        <h3 className="modal__subtitle">ingredients:</h3>
        {newIngredients.map((newIngredients, i) => (
          <input
            className="form-group__input"
            type="text"
            key={i}
            value={recipeDetailid.Ingredients}
            onChange={(e) => handleChangeInput(i, e)}
          />
        ))}
        <button type="button" onClick={handleAddIngredientField}>
          +
        </button>
        <button type="button" onClicke={handleRemoveIngredientsField}>
          -
        </button>

        <h3 className="modal__subtitle">steps:</h3>
        {newSteps.map((newSteps, i) => (
          <textarea
            type="text"
            placeholder="enter the steps..."
            key={i}
            value={recipeDetailid.steps}
          />
        ))}
        <button type="button">+</button>
        <button type="button">-</button>

        <div className="modal__btngroup">
          <button type="button" onClick={() => closeModal(false)}>
            close
          </button>
          <button
            type="button"
            onClick={() => {
              handleEdit(recipeId);
              setRecipeToEdit(null);
            }}
          >
            update Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
