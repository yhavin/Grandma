import React, { useState, useEffect } from "react";
import RecipeForm from "../components/RecipeForm.jsx";
import { db } from "../firebase.config.js";
import { collection, getDocs } from "firebase/firestore";
import RecipeCard from "../components/RecipeCard.jsx";
import Grid from '@mui/material/Unstable_Grid2';


const Recipes = () => {

  const collectionName = "recipes"
  const collectionId = collection(db, collectionName);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const response = await getDocs(collectionId);
      const responses = [];
      response.forEach((doc) => responses.push(doc.data()));
      setRecipes(responses);
      // console.log(JSON.stringify(responses, false, 2));
    };

    getRecipes();
  }, [recipes]);

  return (
    <div>
      <RecipeForm />
      <Grid container spacing={3}>
        {recipes.map((recipe, index) => (
          <Grid item key={index} xs={5} md={1.5}>
            <RecipeCard
              title={recipe.title}
              mealType={recipe.mealType}
              ingredients={recipe.ingredients}
              steps={recipe.steps}
              date={recipe.date}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Recipes;