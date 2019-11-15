import React from 'react'
import WorkflowTask from './WorkflowTask.js'
import '../Workflow.css'


// export default class Workflow extends Component{
const Workflow=(props)=>{
  
  const workflowTasks=Object.keys(props.tasks).length>0  ? props.tasks.workflowTasks.map((task, index)=>{
      return(
        <WorkflowTask info={task} key={index} active={task["isActive"]==="Y" } complete={task["isCompleted"] === "Y"} getStatuses={props.getStatuses} statuses={task.id === props.current ? props.statuses : ''} agency={props.agency} workflowUpdate={props.workflowUpdate}/>
      )
  }) : "No Workflow Found on this Record"

  return(
    <div className="workflow">
        {workflowTasks}
    </div>
  )

}


export default Workflow
