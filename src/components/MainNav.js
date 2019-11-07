import React from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import '../SideNav.css'
const MainNav=(props)=>{
  return(
    <div className="sideNav">
      <MaterialIcon icon="home"/>
      <MaterialIcon icon="account_circle"/>
      <MaterialIcon icon="notifications"/>
    </div>
  )
}

export default MainNav
