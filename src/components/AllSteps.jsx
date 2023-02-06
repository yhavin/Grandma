import React from "react";

const AllSteps = ({ allSteps, handleStepEdit, handleStepDelete }) => {
  return (
    <ol>
      {allSteps.map(({ id, description }) => (
        <li key={id}>
            <p>{description}</p>
            <button onClick={() => handleStepEdit(id)}>Edit</button>
            <button onClick={() => handleStepDelete(id)}>Delete</button>
        </li>
      ))}
    </ol>
  )
}

export default AllSteps;