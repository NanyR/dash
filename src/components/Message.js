import React from 'react';

const Message = (props)=>{

  return(
    <div className={`${props.className} text-sm`}>
      <p>{props.text}</p>
    </div>

  )
}


export default Message;
