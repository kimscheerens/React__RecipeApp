import { async } from "@firebase/util";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";

import React from "react";

export const updateIngredientsByPersons = async (id, ingredient) => {
  const ingredientDoc = doc(db, "recept", id);
  const newFields = { ingredient: ingredient * 1 };
  await updateDoc(ingredientDoc, newFields);
};

