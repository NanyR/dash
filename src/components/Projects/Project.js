import React, {Component} from 'react';
import ProjectDashboard from './ProjectDashboard';
import RecordsList from '../Records/RecordsList';
import axios from 'axios';
import '../../Project.css';



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
    this.props.addRecordsToProject(records, this.props.proId)
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
        projRecords={this.props.projRecords}
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
