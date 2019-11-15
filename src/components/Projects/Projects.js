import React from 'react';
import '../../Projects.css';
import Project from './Project.js'
import AddProject from './AddProject.js'


const Projects =(props)=>{
  const projectName=props.currentProjectName ? props.currentProjectName[0].toUpperCase()+props.currentProjectName.substring(1):'';
  const projectsList=props.projects.map((pro, index)=>{
    return(
      <Project name={pro.name} key={index} current={props.currentProjectName === pro.name}/>
    )
  })
  return(
    <div className="projects">
      {props.currentProjectName.length>0 ? <div className='current-project'>{projectName} Project</div>
      :
      <div className='allprojects'>
        {projectsList}
      </div>
    }
    <AddProject addProject={props.addProject}/>
    </div>
  )

}

export default Projects
