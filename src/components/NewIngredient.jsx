import React from "react";

function NewIngredient({ newIngredient, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Ingredient"
        value={newIngredient.name || ""}
        onChange={handleChange}
      />
      {!newIngredient.name ? null : <button type="submit">Add Ingredient</button>}
    </form>
  )
}

export default NewIngredient;