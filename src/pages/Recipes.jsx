import React, { useState, useEffect } from "react";
import { db } from "../firebase.config.js";
import { collection, getDocs } from "firebase/firestore";
import RecipeCard from "../components/RecipeCard.jsx";
// import { Grid } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';


const Recipes = () => {

  const collectionId = collection(db, "recipes");
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
  }, []);

  return (
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
  );
};

export default Recipes;