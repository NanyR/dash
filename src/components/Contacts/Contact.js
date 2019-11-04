import React from 'react'


const Contact=(props)=>{


  return(
    <div>
      <h3>{props.info.isPrimary === 'Y' ? 'Primary ': null}{props.info.type ? props.info.type.text : 'Owner'}</h3>
      {props.info["fullName"] ?   <p>Name: {props.info["fullName"]}</p> : null}
      {props.info.organizationName ? <p>Organization: {props.info.organizationName}</p> : null}

    </div>
  )

}

export default Contact
