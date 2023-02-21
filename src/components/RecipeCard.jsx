import React, { useState } from "react";
import { Card, CardActionArea, CardContent, DialogContent, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Button, Dialog, DialogTitle, DialogActions, Typography } from "@material-ui/core";
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const RecipeCard = ({ title, mealType, ingredients, steps, date }) => {
  
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const capitaliseWord = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  return (
    <div>
      <Card>
        <CardActionArea onClick={handleClickOpen}>
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
      </Card>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {title}
          {open ? (
            <IconButton
              onClick={handleClose}
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
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>
          <Button startIcon={<DeleteOutlineIcon />}>Delete</Button>
          <Typography variant="subtitle1" color="textSecondary">
            {"Added: " + date.toDate().toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </Typography>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RecipeCard;