import React from "react";

const Finished = ({ points, maxPoints,dispatch }) => {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <button className="btn btn-ui" onClick={()=>dispatch({type:'restart'})}>Restart Quiz</button>
    </>
  );
};

export default Finished;
