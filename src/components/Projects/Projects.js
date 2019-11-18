import React from 'react';
import '../../Projects.css';
import Project from './Project.js'
import AddProject from './AddProject.js'


const Projects =(props)=>{
  const projectName=props.currentProject.name? props.currentProject.name.toUpperCase(): null;
  const projectsList=props.projects.map((pro, index)=>{
    return(
      <Project name={pro.name} key={index} current={props.currentProject.name === pro.name} proId={pro._id} handleProjectClick={props.changeProject}/>
    )
  })
  return(
    <div className="projects">
      {props.currentProject.name ? <div className='current-project'>{projectName} Project</div>
      :
      <div>
        <div className='allprojects'>
          {projectsList}
          </div>
        <AddProject addProject={props.addProject}/>
      </div>
    }
    </div>
  )

}

export default Projects
