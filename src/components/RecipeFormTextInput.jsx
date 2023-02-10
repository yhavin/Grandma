import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

const RecipeFormTextInput = ({ name, control, label }) => {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField 
          label={label}
          variant="outlined"
          onChange={onChange} 
          value={value} />
        )
      }
    />
  );
};

export default RecipeFormTextInput;