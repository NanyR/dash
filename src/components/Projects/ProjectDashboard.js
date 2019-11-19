import React, {Component} from 'react';
import axios from 'axios';

export default class ProjectDashboard extends Component{
  constructor(props){
    super(props)
    this.state={
      pFees:[],
      pInspections:[],
      pWorkflows:[],
      pCommunications:[]
    }
    this.getProjectDetails=this.getProjectDetails.bind(this)
  }

  componentDidMount(){
    this.getProjectDetails()
  }

  getProjectDetails(){
    let records=this.props.records;
    axios.defaults.withCredentials = true;
    axios.post(`http://localhost:3001/records/getRecordsInfo`,
      {records}
    ).then((data)=>{
      debugger
    }).catch((err)=>{
      console.log("error getting project details")
    })
  }

  render(){
    return(
      <div className="project-dashboard">
        <div className="project-name">
          {this.props.name}
        </div>
      </div>
    )
  }

}
