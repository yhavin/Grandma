import React, { useState } from "react";
import Ingredients from "./Ingredients";
import { db } from "../firebase.config.js"
import { collection, addDoc } from "firebase/firestore";

function NewRecipeForm() {
  const [recipe, setRecipe] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setRecipe(values => ({...values, [name]: value}));
    console.log(recipe);
  };

  const collectionId = collection(db, "recipes");

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(collectionId, {recipe, ingredients});
    setRecipe("");
  };

  return (
    <div className="NewRecipeForm">
      <h2>New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>Title
          <input
            type="text"
            name="title"
            value={recipe.title || ""}
            onChange={handleChange}
          />
        </label>
        <label>Ingredients
          <Ingredients 
            ingredients={ingredients} 
            setIngredients={setIngredients} />
        </label>
        <input type="submit" />
      </form>
    </div>
  )
};

export default NewRecipeForm;