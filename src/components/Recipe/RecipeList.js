import React, { useEffect, useState } from "react";
import img_test2 from "../../Assets/test1.jpg";
import img_test from "../../Assets/test2.jpg";
import img_breakfast from "../../Assets/breakfast.webp";
import img_dinner from "../../Assets/dinner.jpg";
import { onSnapshot, query, where } from "firebase/firestore";
import { recipeCollectionRef } from "../../utils/crud";
import { useAuth } from "../../utils/useAuth";

// import recep from "./recep";
// recep list is the list of the dinner types on the homepage

const RecipeList = () => {
  const currentUser = useAuth();

  const [category, setcategory] = useState("");
  const [receps, setreceps] = useState([]);

  const handleClick = (e) => {
    setcategory(e.target.value);
    // console.log(e.target.value);
  };

  useEffect(() => {
    const recepRef = query(
      recipeCollectionRef,
      where("category", "==", category)
    );
    onSnapshot(recepRef, (snapshot) => {
      setreceps(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [category]);

  return (
    <section className="allreceps">
      <div className="top-recep__container">
        <div className="top-recep__list">
          <article className="recep-item" >
            <img src={img_breakfast} alt="test" className="recep-item__img" />
            <h3 className="recep-item__title">
              <button
                value="Breakfast"
                onClick={handleClick}
                className="recep-item__link"
              >
                Breakfast
              </button>
            </h3>
          </article>
          <article className="recep-item">
            <img src={img_test2} alt="test" className="recep-item__img" />
            <h3 className="recep-item__title">
              <button
                value="lunch"
                onClick={handleClick}
                className="recep-item__link"
              >
                lunch
              </button>
            </h3>
          </article>
          <article className="recep-item">
            <img src={img_dinner} alt="test" className="recep-item__img" />
            <h3 className="recep-item__title">
              <button
                value="dinner"
                onClick={handleClick}
                className="recep-item__link"
              >
                Dinner
              </button>
            </h3>
          </article>
          <article className="recep-item">
            <img src={img_test} alt="test" className="recep-item__img" />
            <h3 className="recep-item__title">
              <button
                value="snacks"
                onClick={handleClick}
                className="recep-item__link"
              >
                Snacks
              </button>
            </h3>
          </article>
        </div>
        <ul className="top-recep__list">
          {receps.map((recep) => (
            <div className="recep-item" key={recep.data.id}>
              <h3 className="recep-item__title">{recep.data.title}</h3>
              <img
                className="recep-item__label-img"
                src={recep.data.imageUrl}
                alt="image of the recep"
              ></img>
              <div className="label-allergy">
                allergies:
                <span className="label-allergy__item">
                  {recep.data.allergies}
                </span>
              </div>
            </div>
          ))}
        </ul>
      </div>
      {currentUser ? (
        <a href="/RecipeList" className="top-recep__cta">
          See all our recipes
        </a>
      ) : (
        ""
      )}
    </section>
  );
};

export default RecipeList;
