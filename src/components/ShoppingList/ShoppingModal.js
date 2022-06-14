import React from "react";
import { writeShoppingItem } from "../../utils/crud";


const ShoppingModal = ({ closeModal }) => {
  return (
    <div className="ShoppingModal">
      <div className="addToCart">
        <button onClick={() => closeModal(false)}>x</button>
        <div className="ShoppingModal__container">
          <input className="ShoppingModal__input" type="text" placeholder="Name product" />
          <input className="ShoppingModal__input" type="numbre" placeholder="quantity" />
          <input className="ShoppingModal__input" type="text" placeholder="unit" />
          <input className="ShoppingModal__input" type="numbre" placeholder="price" />
        </div>
        <button
          onClick={() => {
            writeShoppingItem();
          }}
        >
          add to chart
        </button>
      </div>
    </div>
  );
};

export default ShoppingModal;
