import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Typography } from "@material-ui/core";

const RecipeFormTextInput = ({ name, control, label }) => {

  return (
    <Controller
      name={name}
      control={control}
      // rules={{required: true}}
      render={({ field: { onChange, value } }) => (
        <div>
          <Typography variant="subtitle1">{label}</Typography>
          <TextField 
            // label={label}
            autoFocus
            fullWidth
            variant="outlined"
            onChange={onChange} 
            value={value}
            size="small"
          />
        </div>
      )}
    />
  );
};

export default RecipeFormTextInput;