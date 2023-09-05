import React, { useEffect } from 'react'

const Timer = ({dispatch,secondsRemaining}) => {
  useEffect(function(){
    const id=setInterval(function(){
        dispatch({type:'tick'});
    },1000);
    return ()=>clearInterval(id)
  },[dispatch])  

  const min=Math.floor(secondsRemaining/60);
  const sec=secondsRemaining%60;
  return (
    <div className='timer'>
        {String(min).padStart(2,'0')}:{String(sec).padStart(2,'0')}
    </div>
  )
}

export default Timer