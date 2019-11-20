import React from 'react';
import '../../Projects.css';
import Project from './Project.js'
import AddProject from './AddProject.js'


const Projects =(props)=>{
  const projectName=props.currentProject.name? props.currentProject.name.toUpperCase(): null;
  const projectsList=props.projects.map((pro, index)=>{
    return(
      <Project
      name={pro.name}
      key={index}
      current={props.currentProject.name === pro.name}
      proId={pro._id}
      handleProjectClick={props.changeProject}
      records={props.records}/>
    )
  })
  return(
    <div className="projects">
      {props.currentProject.name ?
        <Project
        name={props.currentProject.name}
        proId={props.currentProject._id}
        projRecords={props.currentProject.records}
        handleProjectClick={props.changeProject}
        records={props.records}
        className='current-project'
        current={true}/>
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
