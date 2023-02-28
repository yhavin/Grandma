import React, { useState, useEffect } from "react";
import RecipeForm from "../components/RecipeForm.jsx";
import { db } from "../firebase.config.js";
import { collection, onSnapshot } from "firebase/firestore";
import RecipeCard from "../components/RecipeCard.jsx";
import Grid from '@mui/material/Unstable_Grid2';
import { Paper } from '@mui/material';

const Recipes = () => {

  const collectionName = "recipes";
  const collectionId = collection(db, collectionName);

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    onSnapshot(collectionId, snapshot => {
      setRecipes(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }))
    })
  }, []);

  recipes.sort((a, b) => {
    console.log("first check", +b.liked - +a.liked)
    console.log("second check", b.date.seconds - a.date.seconds)

    return +b.liked - +a.liked || b.date.seconds - a.date.seconds;
  })

  return (
    <Paper style={{ padding: 20 }}>
      <RecipeForm />
      <Grid container spacing={3} justifyContent="flex-start" alignItems="flex-start">
        {recipes.map((recipe, index) => (
          <Grid item key={index} xs={12} md={3}>
            <RecipeCard
              title={recipe.title}
              mealType={recipe.mealType}
              ingredients={recipe.ingredients}
              steps={recipe.steps}
              date={recipe.date}
              liked={recipe.liked}
              id={recipe.id}
              collection={collectionName}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Recipes;