import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../firebase.config.js";
import { collection, addDoc } from "firebase/firestore";
import RecipeFormTextInput from "./RecipeFormTextInput.jsx";
import RecipeFormSelectInput from "./RecipeFormSelectInput.jsx";
import RecipeFormArrayInput from "./RecipeFormArrayInput.jsx";
import { Button } from "@material-ui/core";
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material/';

const defaultRecipe = {
  title: "",
  mealType: "",
  ingredients: [{ "name": "" }],
  steps: [{ "description": "" }],
  liked: false,
  uid: ""
};

export const RecipeForm = ({ open, setOpen, uid, author }) => {

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleClose = () => {
    reset(defaultRecipe);
    setOpen(false);
  };

  const methods = useForm({ defaultValues: defaultRecipe });
  const { handleSubmit, reset, control, watch } = methods;

  const cleanSubmission = data => {
    const cleanedIngredients = data.ingredients.filter(ingredient => ingredient.name !== "");
    const cleanedSteps = data.steps.filter(step => step.description !== "");
    const cleanedData = {...data, ingredients: cleanedIngredients, steps: cleanedSteps, date: new Date(), uid: uid, author: author};
    return cleanedData;
  };
  
  const collectionId = collection(db, "recipes");
  
  const onSubmit = data => {
    data = cleanSubmission(data);
    addDoc(collectionId, data);
    // console.log(JSON.stringify(data, false, 2));
    reset(defaultRecipe);
    setSubmitSuccess(true);
    setTimeout(() => {
      handleClose(); 
      setSubmitSuccess(false)
    }, 1200);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>New recipe</DialogTitle>
      <DialogContent dividers>
        <Stack direction={{ xs: "column" }} spacing={{ xs: 2 }}>
          <RecipeFormTextInput name="title" control={control} label="Title" />
          <RecipeFormSelectInput name="mealType" control={control} label="Meal type" />
          <RecipeFormArrayInput name="ingredients" control={control} label="Ingredients" childProp="name" watch={watch} />
          <RecipeFormArrayInput name="steps" control={control} label="Steps" childProp="description" watch={watch} />
        </Stack>
      </DialogContent>
        {!submitSuccess && <DialogActions>
          <Button type="button" variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button type="submit" style={{color: "white", backgroundColor: "#1976d2"}} variant="contained" onClick={handleSubmit(onSubmit)}>Submit</Button>
        </DialogActions>}
        {submitSuccess && <Alert severity="success">Recipe added.</Alert>}
    </Dialog>
  );
};

export default RecipeForm;