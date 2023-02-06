import React from "react";

const AllIngredients = ({ allIngredients, handleIngredientEdit, handleIngredientDelete }) => {
  return (
    <ul>
      {allIngredients.map(({ name, id }) => (
        <li key={id}>
            <p>{name}</p>
            <button onClick={() => handleIngredientEdit(id)}>Edit</button>
            <button onClick={() => handleIngredientDelete(id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default AllIngredients;