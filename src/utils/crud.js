import { collection, addDoc, doc, deleteDoc, updateDoc, getDoc, query, limit, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";

const uuidv4 = require("uuid").v4;

/** START off recipeCollection CRUD */
export const recipeCollectionRef = collection(db, "recept");
// console.log(recipeCollectionRef);

// C create item recipeCollection
export const writeItem = async () => {
  const payload = {};
  const docRef = await addDoc(recipeCollectionRef, payload);
  await addDoc(docRef, payload);
};

// R read item recipeCollection
export const readItem = async id => {
  const docSnap = await getDoc(recipeCollectionRef, id);

  if (docSnap.exists()) {
    // console.log(docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    // console.log("No such document!");
  }
};

// R read ALL item recipeColletion
export const readAllItem = async id => {
  const docRef = doc(db, "recept", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // console.log(docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};
// console.log(readAllItem);

// U update item recipeCollection
export const updateRecipe = async (id, updatedRecipe) => {
  await recipeCollectionRef.doc(id).update(updatedRecipe);
  const doc = await recipeCollectionRef.doc(id).get();

  const NewRecipe = {
    id: doc.id,
    ...doc.data(),
  };

  // console.log(NewRecipe);
  return NewRecipe;
};

// D delete item recipeCollection
export const deleteItem = async id => {
  const docRef = doc(db, "recept", id);
  await deleteDoc(docRef);
};

/** START of favorite CRUD */
export const favoritesCollectionRefLimit = query(collection(db, "favorites"), limit(4));
// console.log(favoritesCollectionRef);

// C create item from favorite collection
export const writeFavoItem = async recipe => {
  const favoRef = collection(db, "favorites");
  const payload = {
    image: `${recipe.imageUrl}`,
    recipeId: `${recipe.id}`,
    title: `${recipe.title}`,
    value: 0,
  };
  await addDoc(favoRef, payload);
};

// R read item from Favorite collection

// U update item from Favorite collection
//** N.O. see update rating below */

// D Delete Favorite collection
export const deleteFavorite = async id => {
  const docRef = doc(db, "favorites", id);
  await deleteDoc(docRef);
};

/** START of rating  */
export const updateRating = async (id, value) => {
  // console.group("updateRating");
  // console.log(id, value);
  // console.groupEnd();
  const favoRef = doc(db, "favorites", id);
  await updateDoc(favoRef, value);
};

/** START of WeekPlanner collection CRUD */

export const calendarRef = collection(db, "WeekPlanner");
// C create item from WeekPlanner collection
// export const writeCalendarItem = async (recipeDetail) => {
//   const id = uuidv4();

//   const payload = {
//     id: id,
//     desc: `${recipeDetail.title}`,
//     start: Timestamp.fromDate(onSelect),
//     end: Timestamp.fromDate(onSelect),
//   };
//   await addDoc(calendarRef, payload);

// };

// R read item from WeekPlanner collection
// U update item from WeekPlanner collection
// D delete item from WeekPlanner collection

/** START of CRUD ShoppingCart collection */
export const shoppingCollectionRef = collection(db, "shoppingCart");
// console.log(shoppingCollectionRef);

// C create item from ShoppingCart collection
export const writeShoppingItem = async recipeDetail => {
  const id = uuidv4();

  const payload = {
    id: id,
    image: `${recipeDetail.imageUrl}`,
    title: `${recipeDetail.title}`,
    ingredients: arrayUnion(...recipeDetail.ingredients),
    cart: "false",
  };
  await addDoc(shoppingCollectionRef, payload);
};

// R read item from ShoppingCart collection

// U update item from ShoppingCart collection

// export const updateCart = async (id) => {
//   const docRef = doc(db, "shoppingCart", id);
//   console.log(docRef);
//   await updateDoc(docRef, { quantity: `${increment || decrement}` });
// };
// console.log(updateCart);

// D delete item from ShoppingCart collection
export const deleteShopping = async id => {
  const docRef = doc(db, "shoppingCart", id);
  await deleteDoc(docRef);
  console.log(id);
  console.log(docRef);
  console.log(deleteShopping);
};

