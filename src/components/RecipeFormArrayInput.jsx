import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const RecipeFormArrayInput = ({ name, control, label, childProp }) => {

  const { fields, append, remove, move } = useFieldArray({ control, name: name });

  return (
    <div>
      <Typography variant="h6">{label}</Typography>
        {fields.map((item, index) => (
          <div key={item.id}>
            <Controller
              name={`${name}[${index}].${childProp}`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  onChange={onChange}
                  value={value} />
              )}
            />
            <ButtonGroup variant="contained" color="secondary" size="large">
              <Button>&uarr;</Button>
              <Button>&darr;</Button>
              <Button onClick={() => remove(index)}>Delete</Button>
            </ButtonGroup>
          </div>
        ))}
    </div>
  );
};

export default RecipeFormArrayInput;