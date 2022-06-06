import React, { useState } from "react";
import { updateRating } from "../../utils/crud";
import img_white from "../../Assets/wit.png";
import img_black from "../../Assets/black.png";

// whith chefshad
const RecipeRating = ({ favoritId, FavoRating }) => {
  const [rating, setRating] = useState(FavoRating || 0);

  return (
    <div className="chefshad-rating">
      {[...Array(5)].map((chefshad, i) => {
        i += 1;

        return (
          <button
            type="button"
            key={i}
            className="btn__rating"
            onClick={() => updateRating(favoritId, { value: i })}
          >
            <img
              alt="chefshead white or black"
              className="btn__icon"
              onClick={() => setRating(i)}
              src={i <= rating ? `${img_black}` : `${img_white}`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default RecipeRating;
