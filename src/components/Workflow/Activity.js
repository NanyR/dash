import React,{Component} from 'react'

import Tile from '../Projects/Tile';
import Table from './Table'

// const Activity = (props)=>{
class Activity extends Component{
  constructor(props){
    super(props)
    this.state={
    activeTasks:[],
    activeWStatus:[],
    actionReq:[],
    inReview:[],
    inspections:[],
    completedTasks:[],
    approved:[],
    denied:[],
    current:[],
    showData:false
    }
    this.updateTrackInfo=this.updateTrackInfo.bind(this)
    this.handleTileClick=this.handleTileClick.bind(this)
    this.flattenReduceAndUpdate=this.flattenReduceAndUpdate.bind(this)
  }

  componentDidMount(){
    this.updateTrackInfo().then((data)=>{
      this.setState({
        activeTasks:Object.assign([],data.activeTasks),
        activeWStatus:Object.assign([], data.activeWStatus),
        actionReq:Object.assign([], data.actionReq),
        inReview:Object.assign([], data.inReview),
        inspections:Object.assign([], data.inspections),
        completedTasks:Object.assign([], data.completedTasks),
        approved:Object.assign([], data.approved),
        denied:Object.assign([], data.denied),
        current:Object.assign([],data.activeTasks)
      })
    }).then(()=>{
      this.setState({
        showData:true
      })
    })
    .catch((err)=>{
      console.log("error")
    })
  }

  updateTrackInfo(){
    return new Promise((resolve, reject)=>{
      //get the last completed task
      //props.data=> [[],[],[]]
        //map through each array -> filter task that is active isActive==='Y'
        const activeTasks = this.props.data.map((rec)=>{
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
      const completedTasks = this.props.data.map((rec)=>{
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
          resolve({activeTasks,activeWStatus, actionReq, inReview, inspections, completedTasks, approved, denied});
    })
  }

  handleTileClick(label){
    switch (label) {
      case "In Review":
        return this.flattenReduceAndUpdate(this.state.inReview)
        break;
      case "Action Required":
        return this.flattenReduceAndUpdate(this.state.actionReq)
        break;
      case "Approved":
        return this.flattenReduceAndUpdate(this.state.approved)
        break;
      case "Denied":
        return this.flattenReduceAndUpdate(this.state.denied)
        break;
    }
  }

  flattenReduceAndUpdate(arr){
      const tasks= (arr.filter((arr)=>{
      return arr.length > 0
    }))
    this.setState({
      current:Object.assign([], tasks)
    })
  }

  render(){
      return(
        <div className="activity portlet">
          <div className="tiles-container">
            <Tile label="In Review" info={this.state.inReview} handleTileClick={this.handleTileClick}/>
            <Tile label="Action Required" info={this.state.actionReq} handleTileClick={this.handleTileClick}/>
            <Tile label="Approved" info={this.state.approved} handleTileClick={this.handleTileClick}/>
            <Tile label="Denied" info={this.state.denied} handleTileClick={this.handleTileClick}/>
          </div>
          <div className="details-container">
            <Table content={this.state.current}/>
          </div>
        </div>
      )
    }
}


export default Activity
