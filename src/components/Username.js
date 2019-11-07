import React from 'react';
import '../Username.css'


const Username = (props)=>{

  return(
    <div className="userName">
      <h1>{props.username}</h1>
    </div>
  )

}

export default Username;
