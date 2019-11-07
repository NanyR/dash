import React from 'react';
import '../Projects.css'


const Projects =(props)=>{

  return(
    <div className="projects">
      <div onClick={props.changeProject} name="building" data='building'> <p className="number">{props.building.length}</p>Building</div>
      <div onClick={props.changeProject} data='planning'> <p className="number">{props.planning.length}</p>Planning</div>
      <div onClick={props.changeProject} data='serviceReq'> <p className="number">{props.serviceReq.length}</p>Service Request</div>
    </div>
  )

}

export default Projects
