import React from 'react';
import ASIGroup from './ASIGroup.js'


const ASIList =(props)=>{
  const asi=props.asiFields.map((group, index)=>{
    return(<ASIGroup info={group} key={index} canEdit={props.canEdit} handleCustomFormsSubmit={props.handleCustomFormsSubmit} handleInputChange={props.handleFieldChange}/>)
  })

  return(
    asi
  )
}

export default ASIList
