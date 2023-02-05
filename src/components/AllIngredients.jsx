import React from "react";

const AllIngredients = ({ allIngredients, handleEdit, handleDelete }) => {
  return (
    <ol>
      {allIngredients.map(({ name, id }, index) => (
        <li key={index}>
            <p>{name}</p>
            <button onClick={() => handleEdit(id)}>Edit</button>
            <button onClick={() => handleDelete(id)}>X</button>
        </li>
      ))}
    </ol>
  )
}

export default AllIngredients;