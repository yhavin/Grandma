import React from "react";

function AllIngredients({ allIngredients, handleDelete }) {
  return (
    <ol>
      {allIngredients.map(({ name, id }, index) => (
        <li key={index}>
            <p>{name}</p>
            <button onClick={() => handleDelete(id)}>X</button>
        </li>
      ))}
    </ol>
  )
}

export default AllIngredients;