import React from 'react';


const WorkflowTask = (props)=>{


  return(
      <div>
        <div>{props.info["description"]}</div>
        <div>{props.info["status"]["value"]}</div>
        { props.complete ?
          <div className="taskdetails">
          <div>Edited by: {props.info["actionbyUser"]["text"]}</div>
          <div>Edited on: {props.info["statusDate"]} </div>
        </div> : null}
      </div>
  )

}


export default WorkflowTask;
