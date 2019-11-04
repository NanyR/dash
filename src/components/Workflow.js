import React from 'react'
import WorkflowTask from './WorkflowTask.js'


// export default class Workflow extends Component{
const Workflow=(props)=>{

  const workflowTasks=props.tasks.map((task, index)=>{
      return(
        <WorkflowTask info={task} key={index} active={task["isActive"]==="Y" } complete={task["isCompleted"] === "Y"} />
      )
  })

  return(
    <div>
      <header>Processing Status</header>
      <section>
        {workflowTasks}
      </section>
    </div>
  )

}


export default Workflow
