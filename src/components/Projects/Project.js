import React, {Component} from 'react';
import ProjectDashboard from './ProjectDashboard';
import RecordsList from '../Records/RecordsList';
import axios from 'axios';



export default class Project extends Component{
//const Project=(props)=>{

  constructor(props){
    super(props)
    this.state={
      error:false,
      projectRecords:[]
    }
    this.handleClick=this.handleClick.bind(this)
    this.addRecordsToProject=this.addRecordsToProject.bind(this)
  }

  handleClick(e){
    e.preventDefault();
    this.props.handleProjectClick(this.props.proId)
  }

  addRecordsToProject(records){
    axios.defaults.withCredentials = true;
    axios.post(`http://localhost:3001/projects/update`,
      {
        projectId:this.props.proId,
        records:records
      }
    ).then((data)=>{
      this.setState({
        projectRecords:Object.assign([], data.data)
      })
    }).catch((err)=>{
      console.log(err.status)
      console.log('error adding record to project')
      this.setState({
        error:true
      })
    })
  }

  render(){

  return(
    <div>
    {this.props.current ?
      <div className="project-container">
        <ProjectDashboard
        name={this.props.name}

        proId={this.props.proId}
        projRecords={this.props.projRecords}
        />

        <RecordsList
        records={this.props.records}
        getRecordInfo={this.props.getRecordInfo}
        current={false}
        addRecordsToProject={this.addRecordsToProject}
        home={false}/>
        </div> :
      <div className="project-tile" onClick={this.handleClick}>
        <p className="text-med text-title">{this.props.name}</p>
        <p className="text-med">{this.props.qty}</p>
      </div>
    }
    </div>
  )}
}
