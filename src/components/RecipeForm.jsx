import React, { useState, useRef } from "react";
import NewIngredient from "./NewIngredient"
import AllIngredients from "./AllIngredients";
import { db } from "../firebase.config.js"
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

let nextId = 0;

const RecipeForm = () => {
  const [newIngredient, setNewIngredient] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target;
      setNewIngredient(prev => ({
        ...prev,
        id: uuidv4(),
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
  }

  const newIngredientInput = useRef(null);

  const handleEdit = (ingredientIdToEdit) => {
    setNewIngredient(allIngredients.find(ingredient => ingredient.id === ingredientIdToEdit));
    handleDelete(ingredientIdToEdit);
  }

  const handleDelete = (ingredientIdToRemove) => {
    setAllIngredients(prev => prev.filter(ingredient => ingredient.id !== ingredientIdToRemove));
    newIngredientInput.current.focus();
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

  return (
    <div className="RecipeForm">
      <h2>New Recipe</h2>
        <NewIngredient 
          newIngredient={newIngredient}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          ref={newIngredientInput}
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