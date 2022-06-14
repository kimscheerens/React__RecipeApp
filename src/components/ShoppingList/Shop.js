import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { updateCart, deleteShopping } from "../../utils/crud";
import { collection, increment, onSnapshot, updateDoc } from "firebase/firestore";
import { useCounter } from "../../state/useCounter";
import ShoppingModal from "./ShoppingModal";

//crud for the shopping

function Shop({ recipeShop }) {
  const [openShopModal, setOpenShopModal] = useState(false);
  console.log(recipeShop);
  //  const [count, setCount] = useState(`${i.quantity}`);
  const [count, setCount] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState({
    id: "",
    ingredient: "",
    price: "",
    unit: "",
    url: "",
    cart: false,
    amount: "",
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
              <th>Recipe Title</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <button className="btn__sm" onClick={() => deleteShopping(cart.id)} shoppingId={cart.id}>
            Empty Cart
          </button>
          <tbody>
            {cart.map((i, index) => (
              <tr key={i.id}>
                <th>{index + 1}</th>
                <th>
                  <td>{i.title}</td>
                  <img src={i.url} className="cart-img" />
                  <img src={i.image} className="cart-img" />
                </th>
                <td>{i.name}</td>
                <td>{i.price} €</td>
                <td>
                  <button onClick={() => setCount(count - 1)} className="btn__sm">
                    -
                  </button>
                  <div>{i.quantity}</div>
                  {count}
                  <button onClick={() => setCount(count + 1)} className="btn__sm" size="sm">
                    +
                  </button>
                  <button className="btn__sm" onClick={() => deleteShopping(cart.id)} shoppingId={cart.id}>
                    🗑️
                  </button>
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
