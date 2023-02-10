import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

const RecipeFormArrayInput = ({ name, control, label }) => {

  const { fields, append, remove, move } = useFieldArray({ control, name: name });

  return (
    <ul>
      {fields.map((item, index) => (
        <Controller
        key={item.id}
        name={`${name}[${index}].name`}
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
      ))}
    </ul>
  );
};

export default RecipeFormArrayInput;