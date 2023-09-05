const Questions = ({questions,dispatch,answer}) => {
  console.log(questions);
  const hasAnswered=answer!==null;
  const correctOption=questions.correctOption;
  return (
    <div>
        <h2>{questions.question}</h2>
        <div className='options'>
            {questions.options.map((option,index)=>{
                return (
                    <button className={`btn btn-option ${hasAnswered?correctOption===index?'correct':'wrong':''}`} onClick={()=>dispatch({type:'newAnswer',payload:index})} disabled={hasAnswered} key={index}>{option}</button>
                )
            })}
        </div>
    </div>
  )
}

export default Questions