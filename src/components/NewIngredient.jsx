import React, { forwardRef } from "react";

const NewIngredient = forwardRef(({ newIngredient, handleChange, handleSubmit }, ref) => {
  return (
    <form onSubmit={handleSubmit}>
      <h3>Ingredients</h3>
      <input
        ref={ref}
        name="name"
        placeholder="Ingredient"
        value={newIngredient.name || ""}
        onChange={handleChange}
      />
      {!newIngredient.name ? null : <button type="submit">Add Ingredient</button>}
    </form>
  )
})

export default NewIngredient;