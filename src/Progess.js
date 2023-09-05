import React from "react";

const Progess = ({ index, numQuestions, points, maxPoints,answer}) => {
  return (
    <div className="progress">
       <progress max={numQuestions} value={index+(answer!==null)}></progress> 
      <p> Question <strong>{index+1}</strong> / {numQuestions}</p>
      <p><strong>{points}</strong>/{maxPoints}</p>
    </div>
  );
};

export default Progess;
