import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { db, auth, logout } from "../firebase.config.js";
import { collection, onSnapshot, query, getDocs, where } from "firebase/firestore";
import RecipeForm from "../components/RecipeForm.jsx";
import RecipeCard from "../components/RecipeCard.jsx";
import Grid from '@mui/material/Unstable_Grid2';
import { Paper, Button } from '@mui/material';

const Recipes = () => {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    // fetchUserName();
  }, [user, loading]);

  // const fetchUserName = async () => {
  //   try {
  //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setName(data.firstName + " " + data.lastName)
  //   } catch (err) {
  //     console.error(err);
  //     alert("An error occurred while fetching user data.");
  //   }
  // };

  const collectionName = "recipes";
  const collectionId = collection(db, collectionName);

  const [recipes, setRecipes] = useState([]);

  // useEffect(() => {
  //   onSnapshot(collectionId, snapshot => {
  //     setRecipes(snapshot.docs.map(doc => {
  //       return {
  //         id: doc.id,
  //         ...doc.data()
  //       }
  //     }))
  //   })
  // }, []);

  recipes.sort((a, b) => {
    console.log("first check", +b.liked - +a.liked)
    console.log("second check", b.date.seconds - a.date.seconds)

    return +b.liked - +a.liked || b.date.seconds - a.date.seconds;
  })

  return (
    <Paper style={{ padding: 20 }}>
      <div>
        {user && <p>Logged in as {user.email}</p>}
        <Button onClick={logout}>Logout</Button>
      </div>
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