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

  const { register, handleSubmit, control, reset, formState: { isSubmitSuccessful } } = useForm({
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
    move: ingredientMove,
  } = useFieldArray({ control, name: "ingredients" });

  const collectionId = collection(db, "recipes");

  const onSubmit = data => {
    addDoc(collectionId, data);
    reset(defaultRecipe);
  }

  const numIngredients = ingredientFields.filter(obj => obj.name !== "").length;

  return (
    <div>
      <h2>New recipe</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input {...register("title", { required: true })} placeholder="Title" />
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
              <input {...register(`ingredients[${index}].name`)} placeholder="Ingredient" />
              <button type="button" disabled={index === 0} onClick={() => ingredientMove(index, index - 1)}>&uarr;</button>
              <button type="button" disabled={index === (numIngredients)} onClick={() => ingredientMove(index, index + 1)}>&darr;</button>
              <button type="button" disabled={numIngredients === 0} onClick={() => ingredientRemove(index)}>Delete</button>
            </li>
          ))}
          <button type="button" onClick={() => ingredientAppend({ name: "" })}>Add</button>
          <button type="button" disabled={numIngredients === 0} onClick={() => { ingredientRemove(); ingredientAppend({ name: "" }) }}>Clear</button>
        </ul>
        <input type="submit" />
        <p>{"isSubmitSuccessful: " + isSubmitSuccessful}</p>
      </form>
    </div>
  );
}

export default NewRecipe;