import React from 'react';
import '../Projects.css'


const Projects =(props)=>{
  const projectName=props.currentProjectName ? props.currentProjectName[0].toUpperCase()+props.currentProjectName.substring(1):'';
  return(
    <div className="projects">
      {props.currentProjectName.length>0 ? <div className='current-project'>{projectName} Project</div>
      :
      <div className='allprojects'>
        <div onClick={props.changeProject} name="building" data='building' className="project-tiles"> <p className="number">{props.building.length}</p>Building</div>
        <div onClick={props.changeProject} data='planning' className="project-tiles"> <p className="number">{props.planning.length}</p>Planning</div>
        <div onClick={props.changeProject} data='serviceReq' className="project-tiles"> <p className="number">{props.serviceReq.length}</p>Service Request</div>
      </div>
    }
    </div>
  )

}

export default Projects
