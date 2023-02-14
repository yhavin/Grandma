import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { FormControl, Typography } from "@material-ui/core";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const mealTypes = [
  { value: "dinner", label: "Dinner" },
  { value: "lunch", label: "Lunch" },
  { value: "breakfast", label: "Breakfast" },
  { value: "other", label: "Other" },
];

const RecipeFormSelectInput = ({ name, control, label }) => {

  const [type, setType] = useState("");

  const handleChange = (event, newType) => {
    setType(newType);
  }
  
  return (
    <FormControl variant="outlined" fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }}) => (
          <div>
            <Typography variant="subtitle1">{label}</Typography>
            <ToggleButtonGroup size="small" value={type} color="primary" exclusive onChange={(e) => {
              handleChange(e, e.target.value);
              onChange(e);
            }}>
              {mealTypes.map((mealType) => (
              <ToggleButton key={mealType.value} value={mealType.value}>{mealType.label}</ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
        )}
      />
    </FormControl>
  );
};

export default RecipeFormSelectInput;