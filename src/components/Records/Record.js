import React from 'react'


const Record = (props)=>{

  return(
    <button onClick={()=>props.getRecordInfo(props.id)} current={props.current}>
      <p className="text-sm lighter">{props.customId}</p>
      <p className="text-med">{props.alias}</p>
    </button>
  )
}


export default Record
