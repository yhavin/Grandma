import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { db } from "../firebase.config.js";
import { collection, addDoc } from "firebase/firestore";

const NewRecipe = () => {

  const defaultRecipe = {
    title: "",
    mealType: "",
    ingredients: [{ name: "" }]
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
    append,
    remove,
    move
  } = useFieldArray({ control, name: "ingredients" });

  const watchIngredients = watch().ingredients;

  const numIngredients = watchIngredients.filter(ingredient => ingredient.name !== "").length;

  const handleMoveUp = (index, length, array) => {
    index === 0 ? move(index, length - 1) : move(index, index - 1)
  }

  const handleMoveDown = (index, length, array) => {
    index === (length - 1) ? move(index, 0) : move(index, index + 1)
  }

  const cleanSubmission = data => {
    const cleanedIngredients = data.ingredients.filter(ingredient => ingredient.name !== "");
    const cleanedData = {...data, ingredients: cleanedIngredients};
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
              <button type="button" disabled={watchIngredients.length === 1} onClick={() => handleMoveUp(index, watchIngredients.length)}>&uarr;</button>
              <button type="button" disabled={watchIngredients.length === 1} onClick={() => handleMoveDown(index, watchIngredients.length)}>&darr;</button>
              <button type="button" disabled={watchIngredients.length === 1} onClick={() => remove(index, watchIngredients.length)}>Delete</button>
            </li>
          ))}
          <button type="button" onClick={() => append({ name: "" })}>Add</button>
          <button type="button" disabled={watchIngredients.length === 1} onClick={() => { remove(); append({ name: "" }) }}>Clear</button>
        </ul>
        <input type="submit" />
        <p>{submitCount > 0 && "isSubmitSuccessful: " + isSubmitSuccessful}</p>
      </form>
    </div>
  );
}

export default NewRecipe;