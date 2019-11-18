import React, {Component} from 'react';
import ProjectDashboard from './ProjectDashboard'



export default class Project extends Component{
//const Project=(props)=>{

  constructor(props){
    super(props)
    this.state={

    }
    this.handleClick=this.handleClick.bind(this)
  }

  handleClick(e){
    e.preventDefault();
    this.props.handleProjectClick(this.props.proId)
  }

  render(){
  return(
    <div>
    {this.props.current ?
      <ProjectDashboard records={this.state.records}/> :
      <div className="project-tile" onClick={this.handleClick}>
        <p className="text-med text-title">{this.props.name}</p>
        <p className="text-med">4 </p>
      </div>
    }
    </div>
  )}
}
