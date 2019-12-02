import React from 'react';
import '../Username.css'


const Username = (props)=>{

  return(
    <div className="userName">
      <h1 className="text-lg">{props.username}</h1>
    </div>
  )

}

export default Username;
