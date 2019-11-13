import React, {Component} from 'react';

import '../Workflow.css'

class WorkflowTask extends Component{

  constructor(props){
    super(props)
    this.state={
      wfStatus:''
    }
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.workflowUpdate(this.props.info.id, this.state.wfStatus)
  }

  handleChange(e){
    this.setState({
      wfStatus:e.target.value
    })
  }

  render(){
  const statuses= this.props.statuses.length > 0 ? this.props.statuses.map((status, index)=>{
    return(
      <option key={index}>{status.text}</option>
    )
  }): ''
  return(
      <div className="task">
        <div className="task-status">{this.props.info.status === undefined ? " " :  this.props.info.status.value}</div>
        <div className="task-name">{this.props.info.description}</div>
        {this.props.active && this.props.agency ?
          <div>
          <button onClick={()=>this.props.getStatuses(this.props.info.id)}>update</button>
          {this.props.statuses.length > 0 ?
            <form onSubmit={this.handleSubmit}>
              <select onChange={this.handleChange}>
                {statuses}
              </select>
              <input type="submit"/>
            </form>
           : null
         }</div>: null
        }

      </div>
  )
}
}


export default WorkflowTask;
