import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { db } from "../firebase.config.js";
import { collection, addDoc } from "firebase/firestore";

const NewRecipe = () => {

  const defaultRecipe = {
    title: "",
    mealType: "",
    ingredients: [{ name: "" }],
    steps: [{ description: "" }]
  }

  const { register, watch, handleSubmit, control, reset, formState: { submitCount, isSubmitSuccessful } } = useForm({
    defaultValues: defaultRecipe
  });

  const mealTypes = [
    { value: "dinner", label: "Dinner" },
    { value: "lunch", label: "Lunch" },
    { value: "breakfast", label: "Breakfast" },
    { value: "other", label: "Other" },
  ]

  const {
    fields: ingredientFields,
    append: ingredientAppend,
    remove: ingredientRemove,
    move: ingredientMove
  } = useFieldArray({ control, name: "ingredients" });

  const {
    fields: stepFields,
    append: stepAppend,
    remove: stepRemove,
    move: stepMove
  } = useFieldArray({ control, name: "steps" });

  const watchIngredients = watch().ingredients;

  const numIngredients = watchIngredients.filter(ingredient => ingredient.name !== "").length;

  const watchSteps = watch().steps;

  const numSteps = watchSteps.filter(step => step.description !== "").length;

  const handleIngredientMoveUp = (index, length) => {
    index === 0 ? ingredientMove(index, length - 1) : ingredientMove(index, index - 1)
  }

  const handleIngredientMoveDown = (index, length) => {
    index === (length - 1) ? ingredientMove(index, 0) : ingredientMove(index, index + 1)
  }

  const handleStepMoveUp = (index, length) => {
    index === 0 ? stepMove(index, length - 1) : stepMove(index, index - 1)
  }

  const handleStepMoveDown = (index, length) => {
    index === (length - 1) ? stepMove(index, 0) : stepMove(index, index + 1)
  }

  const cleanSubmission = data => {
    const cleanedIngredients = data.ingredients.filter(ingredient => ingredient.name !== "");
    const cleanedSteps = data.steps.filter(step => step.description !== "");
    const cleanedData = {...data, ingredients: cleanedIngredients, steps: cleanedSteps};
    return cleanedData;
  }

  const collectionId = collection(db, "recipes");

  const onSubmit = data => {
    data = cleanSubmission(data);
    // addDoc(collectionId, data);
    console.log(JSON.stringify(data, false, 2));
    reset(defaultRecipe);
  }

  return (
    <div>
      <h2>New recipe</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input {...register("title", { required: true })} type="search" placeholder="Title" />
        <label>Meal type</label>
        <select {...register("mealType")}>
          {mealTypes.map((mealType) => (
            <option key={mealType.label} value={mealType.value}>{mealType.label}</option>
          ))}
        </select>
        <ul>
          <label>{numIngredients} Ingredient{numIngredients !== 1 && "s"}</label>
          {ingredientFields.map((ingredient, index) => (
            <li key={ingredient.id}>
              <input {...register(`ingredients[${index}].name`)} type="search" placeholder="Ingredient" />
              <button type="button" disabled={watchIngredients.length === 1} onClick={() => handleIngredientMoveUp(index, watchIngredients.length)}>&uarr;</button>
              <button type="button" disabled={watchIngredients.length === 1} onClick={() => handleIngredientMoveDown(index, watchIngredients.length)}>&darr;</button>
              <button type="button" disabled={watchIngredients.length === 1} onClick={() => ingredientRemove(index, watchIngredients.length)}>Delete</button>
            </li>
          ))}
          <button type="button" onClick={() => ingredientAppend({ name: "" })}>Add</button>
          <button type="button" disabled={watchIngredients.length === 1} onClick={() => { ingredientRemove(); ingredientAppend({ name: "" }) }}>Clear</button>
        </ul>
        <ol>
          <label>{numSteps} Step{numSteps !== 1 && "s"}</label>
          {stepFields.map((step, index) => (
            <li key={step.id}>
              <input {...register(`steps[${index}].description`)} type="search" placeholder="Step" />
              <button type="button" disabled={watchSteps.length === 1} onClick={() => handleStepMoveUp(index, watchSteps.length)}>&uarr;</button>
              <button type="button" disabled={watchSteps.length === 1} onClick={() => handleStepMoveDown(index, watchSteps.length)}>&darr;</button>
              <button type="button" disabled={watchSteps.length === 1} onClick={() => stepRemove(index, watchSteps.length)}>Delete</button>
            </li>
          ))}
          <button type="button" onClick={() => stepAppend({ description: "" })}>Add</button>
          <button type="button" disabled={watchSteps.length === 1} onClick={() => { stepRemove(); stepAppend({ description: "" }) }}>Clear</button>
        </ol>
        <input type="submit" />
        <p>{submitCount > 0 && "isSubmitSuccessful: " + isSubmitSuccessful}</p>
      </form>
    </div>
  );
}

export default NewRecipe;