import React, { useState, useRef } from "react";
import NewIngredient from "./NewIngredient"
import AllIngredients from "./AllIngredients";
import NewStep from "./NewStep";
import AllSteps from "./AllSteps";
import { db } from "../firebase.config.js"
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

// Libraries to look into: Formik, React-Hook-Form

const RecipeForm = () => {

  // Ingredients state setup
  const [newIngredient, setNewIngredient] = useState({});

  const handleIngredientChange = ({ target }) => {
    const { name, value } = target;
    setNewIngredient({
      id: uuidv4(),
      [name]: value
    });
  }

  const [allIngredients, setAllIngredients] = useState([]);

  const handleIngredientSubmit = (e) => {
    e.preventDefault();

    // Prevent submission of empty ingredient
    if (!newIngredient.name) return;

    // Prevent submission of duplicate ingredient
    if (allIngredients.some(ingredient => ingredient.name === newIngredient.name)) {
      alert("Ingredient already added.")
      setNewIngredient({});
      // If ingredient is not duplicate
    } else {
      setAllIngredients(prev => [...prev, newIngredient]);
      setNewIngredient({});
      newIngredientInput.current.focus();
    }
  }

  const newIngredientInput = useRef(null);

  const handleIngredientEdit = (ingredientIdToEdit) => {
    setNewIngredient(allIngredients.find(ingredient => ingredient.id === ingredientIdToEdit));
    handleIngredientDelete(ingredientIdToEdit);
  }

  const handleIngredientDelete = (ingredientIdToRemove) => {
    setAllIngredients(prev => prev.filter(ingredient => ingredient.id !== ingredientIdToRemove));
    newIngredientInput.current.focus();
  }

  // Steps state setup
  const [newStep, setNewStep] = useState({});

  const handleStepChange = ({ target }) => {
    const { name, value } = target;
    setNewStep({
      [name]: value,
      id: uuidv4()
    });
  }

  const [allSteps, setAllSteps] = useState([]);

  const handleStepSubmit = (e) => {
    e.preventDefault();

    // Prevent submission of empty step
    if (!newStep.description) return;

    // Prevent submission of duplicate step
    if (allSteps.some(step => step.description === newStep.description)) {
      alert("Step already added.")
      setNewStep({});

      // If step is not duplicate
    } else {
      console.log('CREATING', newStep)
      setAllSteps(prev => [...prev, newStep]);
      setNewStep({});
      newStepInput.current.focus();
    }
  }

  const newStepInput = useRef(null);

  const handleStepEdit = (stepIdToEdit) => {
    setNewStep(allSteps.find(step => step.id === stepIdToEdit));
    // handleSt/epDelete(stepIdToEdit);
  }

  const handleStepDelete = (stepIdToRemove) => {
    setAllSteps(prev => prev.filter(step => step.id !== stepIdToRemove));
    newStepInput.current.focus();
  }

  const collectionId = collection(db, "recipes");

  // TODO: UPDATE FOR STEPS AS WELL
  const handleUpload = () => {
    if (allIngredients.length === 0) {
      alert("Please add ingredients.")
      return;
    }
    addDoc(collectionId, { allIngredients, allSteps });
    alert("Recipe added.")
    setAllIngredients([]);
    setAllSteps([]);
  }

  return (
    <div className="RecipeForm">
      <h2>New Recipe</h2>
      <NewIngredient
        newIngredient={newIngredient}
        handleIngredientChange={handleIngredientChange}
        handleIngredientSubmit={handleIngredientSubmit}
        ref={newIngredientInput}
      />
      <AllIngredients
        allIngredients={allIngredients}
        handleIngredientEdit={handleIngredientEdit}
        handleIngredientDelete={handleIngredientDelete}
      />
      <NewStep
        newStep={newStep}
        handleStepChange={handleStepChange}
        handleStepSubmit={handleStepSubmit}
        ref={newStepInput}
      />
      <AllSteps
        allSteps={allSteps}
        handleStepEdit={handleStepEdit}
        handleStepDelete={handleStepDelete}
      />
      <button type="upload" onClick={handleUpload}>Add Recipe</button>
    </div>
  )
};

export default RecipeForm;