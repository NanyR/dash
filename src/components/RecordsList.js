import React from 'react';


const RecordsList= (props)=>{
  const recordLabels=props.records.map((record, index)=>{
    return(
        <button onClick={props.getRecordInfo} info={record} key={index}current={false}>{record.id}</button>
      )
  })
  return(
    <div>
      {recordLabels}
    </div>
  )
}

export default RecordsList;
