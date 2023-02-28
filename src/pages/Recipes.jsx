import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { db, auth, logout } from "../firebase.config.js";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import RecipeForm from "../components/RecipeForm.jsx";
import RecipeCard from "../components/RecipeCard.jsx";
import Grid from '@mui/material/Unstable_Grid2';
import { Paper, Button } from '@mui/material';

const Recipes = () => {

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const collectionName = "recipes";
  const collectionId = collection(db, collectionName);

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchRecipes();
  }, [user, loading]);

  const fetchRecipes = async () => {
    try {
      const uid = user.uid;
      const q = query(collectionId, where("uid", "==", uid));
      onSnapshot(q, (querySnapshot) => {
        setRecipes(querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }));
      })
    } catch (err) {
      console.error(err);
      alert("Error occurred.");
    }
  };

  recipes.sort((a, b) => {
    return +b.liked - +a.liked || b.date.seconds - a.date.seconds;
  })

  return (
    <Paper style={{ padding: 20 }}>
      <div>
        {user && <p>Logged in as {user.email}</p>}
        <Button onClick={logout}>Logout</Button>
      </div>
      <RecipeForm uid={user ? user.uid: null}/>
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