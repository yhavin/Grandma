import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { db, auth, logout } from "../firebase.config.js";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import RecipeForm from "../components/RecipeForm.jsx";
import RecipeCard from "../components/RecipeCard.jsx";
import PrimaryAppBar from "../components/PrimaryAppBar.jsx";
import Grid from '@mui/material/Unstable_Grid2';
import { Paper, Box, Button , Stack, Typography } from '@mui/material';

const Recipes = () => {

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const collectionName = "recipes";
  const collectionId = collection(db, collectionName);

  const [recipes, setRecipes] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      console.log(query);
      data.map((doc) => console.log(doc.title.toLowerCase()))
      return data.filter((doc) => doc.title.toLowerCase().includes(query));
    }
  }

  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = filterData(searchQuery, recipes);

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
    <Box sx={{ mx: { xs: "0px", lg: "320px" } }}>
      <PrimaryAppBar handleOpen={handleOpen} setSearchQuery={setSearchQuery} />
      <Stack direction="row" spacing={2}>
        {user && <Typography style={{ width: "auto", display: "flex", alignItems: "center" }}>Logged in as {user.email}</Typography>}
        <Button size="small" onClick={logout}>Logout</Button>
      </Stack>
      <Paper style={{ padding: 20 }}>
        <RecipeForm open={open} setOpen={setOpen} uid={user ? user.uid: null} author={user ? user.email: null}/>
        {filteredData.length === 0 && (
          <div>
            <Typography variant="button">No recipes found</Typography>
            <br />
            <br />
         </div>
        )}
        <Grid container spacing={3} justifyContent="flex-start" alignItems="flex-start">
          {filteredData.map((recipe, index) => (
            <Grid item key={index} xs={12} md={3}>
              <RecipeCard
                title={recipe.title}
                mealType={recipe.mealType}
                ingredients={recipe.ingredients}
                steps={recipe.steps}
                date={recipe.date}
                liked={recipe.liked}
                id={recipe.id}
                author={user ? user.email: null}
                collection={collectionName}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Recipes;