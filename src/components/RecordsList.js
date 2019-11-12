import React from 'react';
import '../RecordsList.css';
import Record from './Record.js'

const RecordsList= (props)=>{
  const recordLabels=props.current.id ? <div><div className="current-record text-sm">{props.current.customId}</div> <button className="button-small" onClick={props.resetRecords}>Records</button></div>: props.records.map((record, index)=>{
    return(
      <Record getRecordInfo={props.getRecordInfo} key={index} id={record.id} customId={record.customId} alias={record.type.alias} current={record.id===props.current.id}/>
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
