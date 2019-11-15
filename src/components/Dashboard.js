import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addProject} from '../actions/projects.js';
import axios from 'axios';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import MainNav from './MainNav.js'

import Login from './Login.js'
import Username from './Username.js'
import Projects from './Projects/Projects.js'
import '../Dashboard.css';



class Dashboard extends Component{

  constructor(props){
    super(props)
    this.state={
      user:'',
      agency:false,
      serviceReq:[],
      currentRecord:{},
      currentProject:[],
      currentProjectName:'',
      projects:[],
      portlet:''
    }

    this.handleClick=this.handleClick.bind(this);
    this.getRecordSingle=this.getRecordSingle.bind(this);
    this.handleLogout=this.handleLogout.bind(this);
    this.updateUser=this.updateUser.bind(this);
    this.handleResponse= this.handleResponse.bind(this);
    this.changeProject=this.changeProject.bind(this);
    this.resetCurrentProject=this.resetCurrentProject.bind(this)
    this.resetRecords=this.resetRecords.bind(this);
    this.addProject=this.addProject.bind(this)
  }


  updateUser(username, projects, appType){
    localStorage.setItem('user', username)
    this.setState({
      user:username,
      agency: appType=== "agency",
      projects:Object.assign([], projects)
    })
  }

  changeProject(projectN){
    let project = this.state[projectN];
    this.setState({
      currentProject:Object.assign([], project),
      currentRecord:Object.assign({}, {}),
      currentProjectName:projectN
    })
  }

  resetCurrentProject(){
    this.setState({
        currentProject:Object.assign([], []),
        currentRecord:Object.assign({}, {}),
        currentProjectName:''
    })
  }
  resetRecords(){
    this.setState({
        currentRecord:Object.assign({}, {}),
    })
  }

  addProject(name, description){
    axios.defaults.withCredentials = true;
    axios.post(`http://localhost:3001/projects/new`,
      {
        name:name,
        projectDescription:description
      }
    )
    .then((data)=>{
      debugger
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  handleClick(e){
    e.preventDefault();
    let name=e.target.innerText;

  }

  getRecordSingle(record){
    // e.preventDefault();
    axios.defaults.withCredentials = true;

    // let record= e.target.innerText;
    let idx=this.state.records.findIndex(rec=> rec.id=== record);
    axios.post(`http://localhost:3001/main`,
      {record}
    ).then(function(data){
       this.handleResponse(idx, data.data)
    }.bind(this))
    .catch(err=>{
      console.log(`error getting basic info`)
    })
  }

  handleResponse(idx, data){

    this.setState({
      records:[
        ...this.state.records.slice(0, idx),
        Object.assign(this.state.records[idx], {main:data}),
        ...this.state.records.slice(idx+1)
      ]
    },
    ()=>{
      this.setState({
        currentRecord: Object.assign({}, this.state.records[idx]),
        portlet:'record'
      })
    })

  }



  handleLogout(e){
    e.preventDefault();
    axios.get('http://localhost:3001/logout')
    .then((data)=>{
      this.setState({
        user:'',
        records:[],
        currentRecord:{},
        asiFields:[]
      }, localStorage.removeItem("user"))
    })
    .catch((err)=>{
      console.log('error logging out');
      console.log(err)
    })
  }


render(){
  return(
    <div className="dashboard">
      {this.state.user ?
        <div className="main-container">
          <MainNav
            handleLogout={this.handleLogout}
            resetCurrentProject={this.resetCurrentProject}/>
        <div className="main-dash">
            <Username
            username={this.state.user} />
            <Projects
            projects={this.state.projects}
            addProject={this.addProject}
            changeProject={this.changeProject}
            currentProject={this.state.currentProject}
            currentProjectName={this.state.currentProjectName}
            agency={this.state.agency}/>
            </div>
        </div> :
        <Login updateUser={this.updateUser}/>
      }
    </div>
  )
}
}

const mapStateToProps = (state)=>{
  return{
    projects:state.projects
  }
}

const mapDispatchToProps= (dispatch)=>{
  return{
    addProject : ()=> dispatch({type: 'ADD_PROJECT'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
