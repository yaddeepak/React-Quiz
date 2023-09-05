import React from "react";

const NextButton = ({ dispatch, answer, index, numQuestions }) => {
  if (answer === null) return null;

  const type = index === numQuestions - 1 ? "finished" : "nextQuestion";
  const buttonContent = index !== numQuestions - 1 ? "Next" : "Submit";

  return (
    <div>
      <button className="btn btn-ui" onClick={() => dispatch({ type: type })}>
        {buttonContent}
      </button>
    </div>
  );
};

export default NextButton;
