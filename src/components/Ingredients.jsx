import React from "react";

let nextId = 0;

function Ingredients({ ingredients, setIngredients }) {

  const handleChange = (e) => {
    e.preventDefault();
    setIngredients([e.target.value]);
  };


  return (
    <>
    <input 
      onChange={handleChange}
      value={ingredients || ""}
      type="text"
    />
    {/* <ol>
      {ingredients.map(ingredient => (
        <li key={ingredient.id}>{ingredient.ingredient}</li>
      ))}
    </ol> */}
    </>
  )
};

export default Ingredients;