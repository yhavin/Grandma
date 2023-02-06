import React, { forwardRef } from "react";

const NewStep = forwardRef(({ newStep, handleStepChange, handleStepSubmit }, ref) => {
  return (
    <form onSubmit={handleStepSubmit}>
      <h3>Method</h3>
      <input
        ref={ref}
        name="description"
        placeholder="Instruction"
        value={newStep.description || ""}
        onChange={handleStepChange}
      />
      {!newStep.description ? null : <button type="submit">Add Step</button>}
    </form>
  )
})

export default NewStep;