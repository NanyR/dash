import React.{Component} from 'react'

import Tile from '../Projects/Tile';

// const Activity = (props)=>{
class Acivity extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
  //get the last completed task
  //props.data=> [[],[],[]]
    //map through each array -> filter task that is active isActive==='Y'
    const activeTasks = props.data.map((rec)=>{
      return(
        rec.result.filter((task)=>{
          return task.isActive==='Y'
        })
      )
    });
    //activeTasks= [[{},{}],[{}],[{}]]
    //active tasks with a status property
    const activeWStatus= activeTasks.map((rec)=>{
      return(
        rec.filter(task => task.status)
      )
    })
    //map through activeTasks -> actionReq-> filter tasks that have a status.value.toLowerCase() that includes 'req'
    const actionReq = activeWStatus.map((rec)=>{
      return(
        rec.filter((task)=>{
           return task.status.value.toLowerCase().includes("required")
        })
      )
    })
    //map through activeTasks -> inReview-> filter tasks that have a description.toLowerCase() that includes 'review'
    const inReview = activeTasks.map((rec)=>{
      return(
        rec.filter((task)=>{
          return task.description.toLowerCase().includes('review')
        })
      )
    })
    //Inspections
    const inspections = activeTasks.map((rec)=>{
      return(
        rec.filter((task)=>{
          return task.description.toLowerCase().includes('inspection')
        })
      )
    })
  //go through each array -> filter tasks that  isCompleted==='Y'
  //completedTasks=[[{},{},{}],[{},{},{}],[{},{}]]
  const completedTasks = props.data.map((rec)=>{
    return(
      rec.result.filter((task)=>{
        return task.isCompleted==='Y'
      })
    )
  })
    //map through each array in completedTasks-> approved -> filter tasks that have a description.toLowerCase() that includes 'issuance' with a status.value that includes 'issued' or 'approved'
    const approved = completedTasks.map((rec)=>{
      return(
        rec.filter((task)=>{
          //will approve include any task with a status of approved?
          task.description.toLowerCase().includes('issuance') && task.status.value.toLowerCase().includes('approved')
        })
      )
    })
    //map through each array in completedTasks -> denied -> filter tasks that have a status.value that includes 'denied'
    const denied = completedTasks.map((rec)=>{
      return(
        rec.filter((task)=>{
          task.status.value.toLowerCase().includes('denied')
        })
      )
    })
  }

  render(){
      return(
        <div className="activity portlet">
          <div className="tiles-container">
            <Tile label="In Review" info={inReview} handleTileClick={props.handleTileClick}/>
            <Tile label="Action Required" info={actionReq} handleTileClick={props.handleTileClick}/>
            <Tile label="Approved" info={approved} handleTileClick={props.handleTileClick}/>
            <Tile label="Denied" info={denied} handleTileClick={props.handleTileClick}/>
          </div>
        </div>
      )
    }
}


export default Activity
