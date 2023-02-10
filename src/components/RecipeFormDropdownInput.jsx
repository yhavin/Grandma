import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const mealTypes = [
  { value: "dinner", label: "Dinner" },
  { value: "lunch", label: "Lunch" },
  { value: "breakfast", label: "Breakfast" },
  { value: "other", label: "Other" },
];

const RecipeFormDropdownInput = ({ name, control, label }) => {
  
  return (
    <FormControl variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }}) => (
          <Select onChange={onChange} value={value}>
            {mealTypes.map((mealType) => (
              <MenuItem key={mealType.value} value={mealType.value}>{mealType.label}</MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default RecipeFormDropdownInput;