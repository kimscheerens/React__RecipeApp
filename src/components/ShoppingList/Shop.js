import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { updateCart, deleteShopping } from "../../utils/crud";
import { collection, increment, onSnapshot, updateDoc } from "firebase/firestore";
import { useCounter } from "../../state/useCounter";

//crud for the shopping

function Shop({ recipeShop }) {
  console.log(recipeShop);
  //  const [count, setCount] = useState(`${i.quantity}`);
   const [count, setCount] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState({
    id: "",
    name: "",
    price: "",
    url: "",
    cart: false,
    quantity: "",
  });
 

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
        <h4 className="shoppingList__title">Your ShoppingList 🛒</h4>
        <table className="shoppingList-container">
          <thead className="shoppingList-header">
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
                  <img src={i.url} className="cart-img" />
                </th>
                <td>{i.name}</td>
                <td>{i.price} €</td>
                <td>
                  <button onClick={() => setCount(count -1)} className="btn__sm">
                    -
                  </button>
                  <div>{i.quantity}</div>
                  {count}
                  <button
                    onClick={() => setCount(count +1)}
                    className="btn__sm"
                    size="sm"
                  >
                    +
                  </button>
                  <button
                    className="btn__sm"
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
