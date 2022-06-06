import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { deleteFavorite } from "../../utils/crud";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import RecipeRating from "./RecipeRating";
import { useAuth } from "../../utils/useAuth";

// const favoriteLimit = query(Ref, orderBy("favorite", "desc"), limit(3));

const Favorites = () => {
  const currentUser = useAuth();
  const [favorite, setFavorite] = useState([]);

  // to get all the data from firestore
  const favoritesCollectionRef = collection(db, "favorites");

  useEffect(() => {
    onSnapshot(favoritesCollectionRef, (snapshot) => {
      setFavorite(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  return (
    <>
      <section className="top-recep">
        <div className="top-favo-recep__container">
          <h2 className="top-recep__title">Most favorite recipes</h2>
          <div className="top-recep__list">
            {favorite.map((favorit) => (
              <article className="Favo-recipe-item">
                <div className="Favo-recipe-item__container" id={favorit.id}>
                  <img
                    src={favorit.image}
                    alt="test"
                    className="Favo-recipe-item__img"
                  />
                  {currentUser ? (
                    <FaHeart
                      className="Favo-recipe-item__heart"
                      onMouseOver={({ target }) =>
                        (target.style.color = "white")
                      }
                      onMouseOut={({ target }) =>
                        (target.style.color = "black")
                      }
                      onClick={() => {
                        deleteFavorite(favorit.id);
                      }}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="Favo-item-overlay"></div>
                <div className="Favo-recipe__item">
                  <h3 className="Favo-recipe__title">{favorit.title}</h3>
                  {currentUser ? (
                    <RecipeRating
                      favoritId={favorit.id}
                      FavoRating={favorit.value}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Favorites;
