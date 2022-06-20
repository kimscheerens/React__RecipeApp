import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { deleteShopping } from "../../utils/crud";
import { collection, onSnapshot } from "firebase/firestore";
import ShoppingModal from "./ShoppingModal";
import ShopCalculator from "./ShopCalculator";

function Shop({ id }) {
  const [openShopModal, setOpenShopModal] = useState(false);
  const [cart, setCart] = useState([]);

  // to get all the data from firestore
  const shoppingCollectionRef = collection(db, "shoppingCart");
  console.log(shoppingCollectionRef);

  useEffect(() => {
    onSnapshot(shoppingCollectionRef, snapshot => {
      setCart(
        snapshot.docs.map(doc => {
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
      <section className="shoppingList">
        <h4 className="shoppingList__title">Your ShoppingList 🛒</h4>
        <button onClick={() => window.print()} className="printer">
          🖨️
        </button>
        <div className="shoppingList__container">
          {cart.map((i, index) => (
            <ul key={i.id}>
              <li className="shoppingList__detailgroup">
                <li> ingredients for: {i.title}</li>
                <img src={i.url} className="cart-img" />
                <img src={i.image} className="cart-img" />
              </li>
              <li className="ingredient">
                {i.ingredients.map((a, idx) => (
                  <div className="ingredient__container">
                    <li className="ingredient__item">
                      {a.ingredient} {a.amount} {a.unit}
                    </li>
                    <ShopCalculator counting={a.amount} />
                  </div>
                ))}
              </li>
            </ul>
          ))}

          <button
            onClick={() => {
              setOpenShopModal(true);
            }}
          >
            add to cart
          </button>
          {openShopModal && <ShoppingModal closeModal={setOpenShopModal} />}
        </div>
        {/* <button className="btn__sm" onClick={() => deleteShopping(id)} shoppingId={id}>
          🗑️ all
        </button> */}
      </section>
    </>
  );
}

export default Shop;

