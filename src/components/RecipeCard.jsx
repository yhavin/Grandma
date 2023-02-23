import React, { useState } from "react";
import { db } from "../firebase.config.js";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { Alert, Card, CardActionArea, CardContent, CardActions, DialogContent, DialogContentText, List, ListItem, ListItemText, IconButton, Grid } from "@mui/material";
import { Button, Dialog, DialogTitle, DialogActions, Typography } from "@material-ui/core";
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const RecipeCard = ({ title, mealType, ingredients, steps, date, liked, id, collection }) => {

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [recipeOpen, setRecipeOpen] = useState(false);

  const handleRecipeOpen = () => {
    setRecipeOpen(true);
  };

  const handleRecipeClose = () => {
    setRecipeOpen(false);
  };

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleLike = (id, liked) => {
    updateDoc(doc(db, collection, id), {
      liked: !liked
    });
    console.log("Updated: " + id + " toggled like: " + !liked);
  };

  const handleRecipeDelete = (id) => {
    setDeleteSuccess(true);
    setTimeout(() => {
      deleteDoc(doc(db, collection, id)); 
      handleConfirmClose();
      handleRecipeClose(); 
      setDeleteSuccess(false);
    }, 1200);
  }

  const capitaliseWord = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  return (
    <div>
      <Card>
        <CardActionArea onClick={handleRecipeOpen}>
          <CardContent>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="subtitle1" color="textSecondary">{capitaliseWord(mealType)}</Typography>
            <br />
            <Typography variant="body2">
              {ingredients.length + " ingredient" + (ingredients.length !== 1 ? "s" : "")}
            </Typography>
            <Typography variant="body2">
              {steps.length + " step" + (steps.length !== 1 ? "s" : "")}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton size="small" color={liked ? "error" : ""} onClick={() => handleLike(id, liked)}><FavoriteIcon /></IconButton>
          <IconButton size="small"><ShareIcon /></IconButton>
        </CardActions>
      </Card>

      <Dialog open={recipeOpen} onClose={handleRecipeClose} fullWidth>
        <DialogTitle>
          {title}
          {recipeOpen ? (
            <IconButton
              onClick={handleRecipeClose}
              sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
          </DialogTitle>
        <DialogContent dividers>
          <Typography variant="button">Ingredients</Typography>
          <List sx={{ listStyleType: "disc", pl: 4 }}>
            {ingredients.map((item, index) => (
              <ListItem sx={{ display: "list-item" }} key={index}>
                <ListItemText>{item.name}</ListItemText>
              </ListItem>
            ))}
          </List>
          <Typography variant="button">Steps</Typography>
          <List sx={{ listStyleType: "decimal", pl: 4 }}>
            {steps.map((item, index) => (
              <ListItem sx={{ display: "list-item" }} key={index}>
                <ListItemText>{item.description}</ListItemText>
              </ListItem>
            ))}
          </List>
          <Typography variant="subtitle1" color="textSecondary">
            {"Added: " + date.toDate().toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </Typography>
        </DialogContent>
        <DialogActions>
          <IconButton size="small" color={liked ? "error" : ""} onClick={() => handleLike(id, liked)}><FavoriteIcon /></IconButton>
          <IconButton size="small"><ShareIcon /></IconButton>
          <Button variant="outlined" style={{ color: "grey", borderColor: "grey" }} startIcon={<EditIcon />}>Edit</Button>
          <Button variant="outlined" style={{ color: "#d32f2f", borderColor: "#d32f2f" }} startIcon={<DeleteOutlineIcon />} onClick={() => setConfirmOpen(true)}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmOpen} onClose={handleConfirmOpen}>
        <DialogTitle>Delete recipe?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this recipe?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        {!deleteSuccess && <DialogActions>
          <Button variant="outlined" onClick={handleConfirmClose}>Cancel</Button>
          <Button variant="outlined" style={{ color: "#d32f2f" }} onClick={() => handleRecipeDelete(id)}>Confirm</Button>
        </DialogActions>}
        {deleteSuccess && <Alert severity="success">Recipe deleted.</Alert>}
      </Dialog>
    </div>
  );
};

export default RecipeCard;