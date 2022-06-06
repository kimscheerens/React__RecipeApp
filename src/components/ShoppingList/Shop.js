import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { updateShopping, deleteShopping } from "../../utils/crud";
import { collection, onSnapshot } from "firebase/firestore";
import { useCounter } from "../../state/useCounter";

//crud for the shopping

function Shop() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState({
    id: "",
    name: "",
    price: "",
    url: "",
    cart: false,
    quantity: "",
  });
  const [count, setCount] = useState({ quantity: "" });

  // to get all the data from firestore
  const shoppingCollectionRef = collection(db, "shoppingCart");
  console.log(shoppingCollectionRef);

  useEffect(() => {
    onSnapshot(shoppingCollectionRef, (snapshot) => {
      setCart(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  function addtocart(item) {
    products.map((i) => {
      if (i.id == item.id) {
        i.cart = true;
      }
    });
    db.collection("shoppingCart").doc(`${item.id}`).set(item, { merge: true });
  }

  function increase(item, quantity) {
    db.collection("shoppingCart")
      .doc(`${item.id}`)
      .update("quantity", quantity.increment(1));
  }

  function decrease(item, quantity) {
    db.collection("shoppingCart")
      .doc(`${item.id}`)
      .update("quantity", quantity.increment(-1));
  }

  function total() {
    let x = 0;
    cart.map((i) => {
      x += i.price * i.quantity;
    });
    return x;
  }

  return (
    <>
      <section className="shoppingList">
        <h4>Your ShoppingList 🛒</h4>
        <div className="shoppingList__background"></div>
        <table classNameName="shoppingList-container">
          <thead classNameName="shoppingList-header">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((i, index) => (
              <tr key={i.id}>
                <th>{index + 1}</th>
                <th>
                  <img src={i.url} style={{ width: "4rem" }} />
                </th>
                <td>{i.name}</td>
                <td>{i.price} €</td>
                <td>
                  <button onClick={() => decrease(i)} classNameName="btn__sm">
                    -
                  </button>
                  {i.quantity}
                  <button
                    onClick={() => increase(i)}
                    classNameName="btn__sm"
                    size="sm"
                  >
                    +
                  </button>
                  <button
                    classNameName="btn__sm"
                    onClick={() => deleteShopping(cart.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <button onClick={() => addtocart}>add to cart</button>
        </table>

        <div classNameName="total">
          <div classNameName="total__item">
            <h4>TOTAL: {total()} €</h4>
          </div>
          <span>
            Printlist
            <button onClick={() => window.print()} classNameName="printer">
              {" "}
              🖨️{" "}
            </button>
          </span>
        </div>
      </section>
    </>
  );
}

export default Shop;
