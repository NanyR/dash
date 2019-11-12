import React from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import '../SideNav.css'

const MainNav=(props)=>{
  return(
    <div className="sideNav">
      <MaterialIcon icon="home" onClick={props.resetCurrentProject}/>
      <MaterialIcon icon="account_circle"/>
      <MaterialIcon icon="notifications"/>
      <button className="button-small">
          <a onClick={props.handleLogout}>
          LOGOUT
          </a>
      </button>
    </div>
  )
}

export default MainNav
