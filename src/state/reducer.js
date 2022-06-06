import { addRecipe } from "./addRecipe";

export function reducer(state, action) {
  switch (action.type) {
    case "addRecipe":
      return addRecipe(state, action);
    case "addIngredient":
      return state.map((recipe) => {
        if (recipe.name === action.name) {
          recipe.ingredients = recipe.ingredients.concat(action.payload);
        }
        return recipe;
      });
    default:
      throw new Error("Unkown method");
  }
}
