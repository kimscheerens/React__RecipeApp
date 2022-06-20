import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { deleteShopping } from "../../utils/crud";
import { collection, onSnapshot, query, where} from "firebase/firestore";
import ShoppingModal from "./ShoppingModal";
import ShopCalculator from "./ShopCalculator";

//crud for the shopping

function Shop({ id }) {
  const [openShopModal, setOpenShopModal] = useState(false);
  const [product, setProduct] = useState([]);

  const [counting, setCounting] = useState(1);
  const [cart, setCart] = useState([]);

  // to get all the data from firestore
  const shoppingCollectionRef = collection(db, "shoppingCart");

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


  useEffect(() => {
    onSnapshot(shoppingCollectionRef, snapshot => {
      setProduct(
        snapshot.docs.map(doc => {
          const dbObj = doc.data();
          const productData = dbObj.ingredients;
          console.log(dbObj.ingredients);
          return {
           ...productData(),
          };
        })
      );
    });
  }, []);

  function total() {
    let x = 0;
    cart.map(i => {
      x += i.price * i.quantity;
    });
    return x;
  }

  return (
    <>
      <section className="shoppingList">
        <h4 className="shoppingList__title">Your ShoppingList 🛒</h4>
        <table className="shoppingList-container">
          <thead className="shoppingList-header">
            <tr>
              <th>#</th>
              <th>Recipe Title</th>
              <th>ingredient</th>
              <th>amount</th>
              <th>unit</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((i, index) => (
              <tr key={i.id}>
                <th>{index + 1}</th>
                <th>
                  <td>{i.title}</td>
                  <img src={i.url} className="cart-img" />
                  <img src={i.image} className="cart-img" />
                </th>

                {product.map((a, idx) => (
                  <div key={idx}>
                    <li>(JSON.stringify{a.ingredient})</li>
                    <li>{a.amount}</li>
                    <li>{a.unit}</li>
                  </div>
                ))}

                <td className="btn__group">
                  <div>{i.quantity}</div>

                  <ShopCalculator counting={counting} setCounting={setCounting} />
                </td>
              </tr>
            ))}
          </tbody>
          <button
            onClick={() => {
              setOpenShopModal(true);
            }}
          >
            add to cart
          </button>
          {openShopModal && <ShoppingModal closeModal={setOpenShopModal} />}
        </table>
        <button className="btn__sm" onClick={() => deleteShopping(id)} shoppingId={id}>
          🗑️ all
        </button>
        <div className="total">
          <div className="total__item">
            <h4>TOTAL: {total()} €</h4>
          </div>
          <span>
            Printlist
            <button onClick={() => window.print()} className="printer">
              🖨️
            </button>
          </span>
        </div>
      </section>
    </>
  );
}

export default Shop;
