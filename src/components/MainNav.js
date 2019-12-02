import React from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import Icon from '@material-ui/core/Icon';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Home from '@material-ui/icons/Home';
import Settings from '@material-ui/icons/Settings';
import Notifications from '@material-ui/icons/Notifications';
import '../SideNav.css'

const MainNav=(props)=>{
  return(
    <div className="SideNav">
      <Home
      onClick={props.resetCurrentProject}
      fontSize="large"
      />
      <Settings fontSize="large"/>
      <Notifications fontSize="large"/>
      <button className="button-small">
          <a onClick={props.handleLogout}>
          LOGOUT
          </a>
      </button>
    </div>
  )
}

export default MainNav
