import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { TextField, Typography } from "@material-ui/core";
import { ButtonGroup, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const RecipeFormArrayInput = ({ name, control, label, childProp }) => {

  const { fields, append, remove, move } = useFieldArray({ control, name: name });

  const handleMoveDown = (index, length) => {
    index === (length - 1) ? move(index, 0) : move(index, index + 1);
  };

  const handleMoveUp = (index, length) => {
    index === 0 ? move(index, length - 1) : move(index, index - 1);
  };

  return (
    <div>
      <Typography variant="subtitle1">{label}</Typography>
      {fields.map((item, index) => (
        <div key={item.id}>
          <Controller
            defaultValue={""}
            name={`${name}[${index}].${childProp}`}
            control={control}
            render={({ field: { ref, onChange, value } }) => (
                <TextField
                  variant="outlined"
                  onChange={onChange}
                  value={value}
                  size="small"
                  style={{ width: "68%" }}
                  inputRef={ref}
                />
            )}
          />
          <ButtonGroup variant="outlined" size="normal" color="primary">
            <Button disabled={fields.length === 1} onClick={() => handleMoveUp(index, fields.length)}>
              <ArrowUpwardIcon />
            </Button>
            <Button disabled={fields.length === 1} onClick={() => handleMoveDown(index, fields.length)}>
              <ArrowDownwardIcon />
            </Button>
            <Button disabled={fields.length === 1} onClick={() => remove(index)}>
              <DeleteIcon />
            </Button>
          </ButtonGroup>
        </div>
      ))}
      <ButtonGroup variant="outlined" size="normal" color="secondary">
        <Button onClick={() => append({}, { shouldFocus: true, focusName: `${name}[${fields.length}].${childProp}` })}>
          <AddIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default RecipeFormArrayInput;