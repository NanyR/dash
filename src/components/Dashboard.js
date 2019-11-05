import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addProject} from '../actions/projects.js';
import axios from 'axios';
import MaterialIcon, {colorPalette} from 'material-icons-react';

import LoginForm from './LoginForm.js'
import RecordsList from './RecordsList.js'
import RecordSingle from './RecordSingle.js'
import Username from './Username.js'
import Projects from './Projects.js'



class Dashboard extends Component{

  constructor(props){
    super(props)
    this.state={
      user:'',
      records:[],
      building:[],
      planning:[],
      serviceReq:[],
      currentRecord:{},
      currentProject:[],
      portlet:''
    }

    this.handleClick=this.handleClick.bind(this);
    this.getRecordSingle=this.getRecordSingle.bind(this);
    this.handleLogout=this.handleLogout.bind(this);
    this.updateUser=this.updateUser.bind(this);
    this.handleResponse= this.handleResponse.bind(this);
    this.changeProject=this.changeProject.bind(this)
  }


  updateUser(username, records){
    let building= records.filter(rec =>{
      return rec.type.module==='Building'
    })
    let planning= records.filter(rec=>{
      return rec.type.module === 'Planning'
    })
    let serviceReq=records.filter(rec=>{
      return rec.type.module==='ServiceRequest'
    })
    this.setState({
      user:username,
      records:Object.assign([], records),
      building:Object.assign([], building),
      planning:Object.assign([], planning),
      serviceReq:Object.assign([], serviceReq)
    })
  }

  changeProject(e){
    e.preventDefault();
    let projectName=e.target.attributes.data.nodeValue;
    let project = this.state[projectName];
    this.setState({
      currentProject:Object.assign([], project)
    })
  }

  handleClick(e){
    e.preventDefault();
    let name=e.target.innerText;
    
    if(name === 'My Projects'){
      this.setState({
        currentProject:Object.assign([], [])
      })
    }
    // this.props.addProject()
  }

  getRecordSingle(e){
    e.preventDefault();
    axios.defaults.withCredentials = true;
    let record= e.target.innerText;
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
      })
    })
    .catch((err)=>{
      console.log('error logging out');
      console.log(err)
    })
  }


render(){
  return(
    <div>
      {this.state.user ?
        <div>
          <Username
          username={this.state.user} />
          <button>
              <a onClick={this.handleLogout}>
              LOGOUT
              </a>
          </button>
          <button onClick={this.handleClick}>My Projects</button>
          { this.state.currentProject.length>0 ?
              <RecordsList
              getRecordInfo={this.getRecordSingle}
              records={this.state.currentProject}/> :
            <Projects building={this.state.building}
            planning={this.state.planning}
            serviceReq={this.state.serviceReq}
            changeProject={this.changeProject}/>
          }

          {this.state.currentRecord.id ?
            <RecordSingle
            recDetails={this.state.currentRecord} canEdit={this.state.currentRecord.id.includes('EST')} handleFieldChange={this.handleFieldChange}
            portlet={this.state.portlet}/>
            : null }

        </div> :
        <LoginForm updateUser={this.updateUser}/>
      }
    </div>

  )}

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
