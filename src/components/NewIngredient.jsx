import React, { forwardRef } from "react";

const NewIngredient = forwardRef(({ newIngredient, handleIngredientChange, handleIngredientSubmit }, ref) => {
  return (
    <form onSubmit={handleIngredientSubmit}>
      <h3>Ingredients</h3>
      <input
        ref={ref}
        name="name"
        placeholder="Ingredient"
        value={newIngredient.name || ""}
        onChange={handleIngredientChange}
      />
      {!newIngredient.name ? null : <button type="submit">Add Ingredient</button>}
    </form>
  )
})

export default NewIngredient;