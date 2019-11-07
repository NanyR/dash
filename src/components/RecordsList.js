import React from 'react';
import '../RecordsList.css';

const RecordsList= (props)=>{
  const recordLabels=props.records.map((record, index)=>{
    return(
        <button onClick={props.getRecordInfo} info={record} key={index}current={false}>{record.id}</button>
      )
  })
  return(
    <div className="records-list">
    <header>Records</header>
      {recordLabels}
    </div>
  )
}

export default RecordsList;
