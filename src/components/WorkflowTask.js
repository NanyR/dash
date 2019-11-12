import React from 'react';

import '../Workflow.css'


const WorkflowTask = (props)=>{
  const statuses= props.statuses.length > 0 ? props.statuses.map((status, index)=>{
    return(
      <option key={index}>{status.text}</option>
    )
  }): ''
  return(
      <div className="task">
        <div className="task-status">{props.info.status === undefined ? " " :  props.info.status.value}</div>
        <div className="task-name">{props.info.description}</div>
        {props.active ?
          <button onClick={()=>props.getStatuses(props.info.id)}>update</button>: null
        }
        {props.statuses.length > 0 ?
          <select>
            {statuses}
          </select> : null
        }
      </div>
  )

}


export default WorkflowTask;
