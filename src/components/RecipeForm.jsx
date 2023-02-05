import React, { useState, useRef } from "react";
import NewIngredient from "./NewIngredient"
import AllIngredients from "./AllIngredients";
import { db } from "../firebase.config.js"
import { collection, addDoc } from "firebase/firestore";

let nextId = 0;

function RecipeForm() {
  const [newIngredient, setNewIngredient] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewIngredient(prev => ({
      ...prev,
      id: nextId,
      [name]: value
    }));
  }

  const [allIngredients, setAllIngredients] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newIngredient.name) return;
    setAllIngredients(prev => [...prev, newIngredient]);
    console.log(allIngredients);
    setNewIngredient({});
    nextId++;
  }

  const newIngredientInput = useRef(null);

  const handleEdit = (ingredientIdToEdit) => {
    setNewIngredient(allIngredients[ingredientIdToEdit]);
    handleDelete(ingredientIdToEdit);
  }

  const handleDelete = (ingredientIdToRemove) => {
    setAllIngredients(prev => prev.filter(ingredient => ingredient.id !== ingredientIdToRemove));
  }

  const collectionId = collection(db, "recipes");

  const handleUpload = () => {
    if (allIngredients.length === 0) {
      alert("Please add ingredients.")
      return;
    }
    addDoc(collectionId, {allIngredients});
    alert("Recipe added.")
    setAllIngredients([]);
    nextId = 0;
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   addDoc(collectionId, { recipe, ingredients });
  //   setRecipe({});
  //   setIngredients([]);
  // };

  return (
    <div className="RecipeForm">
      <h2>New Recipe</h2>
        <label>Ingredients
        </label>
        <NewIngredient 
          newIngredient={newIngredient}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <AllIngredients 
          allIngredients={allIngredients} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete}
        />
        <button type="upload" onClick={handleUpload}>Add Recipe</button>
    </div>
  )
};

export default RecipeForm;