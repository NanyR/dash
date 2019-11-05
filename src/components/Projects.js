import React from 'react';


const Projects =(props)=>{

  return(
    <div className="projects">
      <div onClick={props.changeProject} data='building'>Building {props.building.length}</div>
      <div onClick={props.changeProject} data='planning'>Planning {props.planning.length}</div>
      <div onClick={props.changeProject} data='serviceReq'>Service Request {props.serviceReq.length}</div>
    </div>
  )

}

export default Projects
