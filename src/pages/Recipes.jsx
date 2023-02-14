import React, { useState, useEffect } from "react";
import { db } from "../firebase.config.js";
import { collection, getDocs } from "firebase/firestore";

const Recipes = () => {

  const collectionId = collection(db, "recipes");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const response = await getDocs(collectionId);
      const responses = [];
      response.forEach((doc) => responses.push(doc.data()));
      setRecipes(responses);
      console.log(JSON.stringify(responses, false, 2));
    }

    getRecipes();
  }, []);

  return (
    <div>
      <h1>This is a list of all recipes</h1>
    </div>
  )
};

export default Recipes;