import React from 'react'


const Location = (props)=>{

  return(
    <div>
      <h3>LOCATION</h3>
      <p>{props.locationInfo[0].streetAddress}</p>
    </div>
  )

}


export default Location
