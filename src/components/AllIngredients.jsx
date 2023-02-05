import React from "react";

const AllIngredients = ({ allIngredients, handleEdit, handleDelete }) => {
  return (
    <ul>
      {allIngredients.map(({ name, id }) => (
        <li key={id}>
            <p>{name}</p>
            <button onClick={() => handleEdit(id)}>Edit</button>
            <button onClick={() => handleDelete(id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default AllIngredients;