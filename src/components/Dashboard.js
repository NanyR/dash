import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addProject} from '../actions/projects.js';
import axios from 'axios';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import MainNav from './MainNav.js'

import Login from './Login.js'
import Username from './Username.js'
import Projects from './Projects/Projects.js';
import RecordsList from './Records/RecordsList.js';
import ShoppingCart from './Fees/ShoppingCart.js';
import '../Dashboard.css';



class Dashboard extends Component{

  constructor(props){
    super(props)
    this.state={
      user:'',
      agency:false,
      serviceReq:[],
      currentRecord:{},
      currentProject:{},
      myRecords:[],
      projects:[],
      portlet:'',
      shoppingCart:[],
      showMyRecords:false
    }

    this.handleClick=this.handleClick.bind(this);
    this.getRecordSingle=this.getRecordSingle.bind(this);
    this.handleLogout=this.handleLogout.bind(this);
    this.updateUser=this.updateUser.bind(this);
    this.handleResponse= this.handleResponse.bind(this);
    this.changeProject=this.changeProject.bind(this);
    this.resetCurrentProject=this.resetCurrentProject.bind(this)
    this.resetRecords=this.resetRecords.bind(this);
    this.getMyRecords=this.getMyRecords.bind(this);
    this.addProject=this.addProject.bind(this);
    this.addRecordsToProject=this.addRecordsToProject.bind(this);
    this.addToCart=this.addToCart.bind(this);
    this.removeFromCart=this.removeFromCart.bind(this);
    this.changePortlet=this.changePortlet.bind(this);
    this.handlePortletChange=this.handlePortletChange.bind(this)
  }

  // componentDidMount(){
  //   this.getMyRecords()
  // }

  updateUser(username, projects, appType){
    localStorage.setItem('user', username)
    this.setState({
      user:username,
      agency: appType=== "agency",
      projects:Object.assign([], projects)
    }, this.getMyRecords())
  }



  changeProject(projectN){
    var pro = this.state.projects.find((proj)=>proj._id===projectN);
    this.setState({
      currentProject:Object.assign({}, pro)
      // currentProject:projectN
    })
  }

  addToCart(fees){
    // go through each fee object in array, filter out fees that have an id that is included in the current shoppingCart
    let diffFees=fees.filter((fee)=>{
      return ((this.state.shoppingCart.findIndex((scF)=>scF.id===fee.id)) < 0);
    })
    this.setState({
      shoppingCart:[...this.state.shoppingCart, ...diffFees]
    })
    //update the state of shoppingCart with the new fees
  }

  removeFromCart(id){
    let idx=this.state.shoppingCart.findIndex(fee=>fee.id===id);
    this.setState({
      shoppingCart:[...this.state.shoppingCart.slice(1, idx),
        ...this.state.shoppingCart.slice(idx+1)]
    })
  }

  resetCurrentProject(){
    this.setState({
        currentProject:Object.assign({}, []),
        currentRecord:Object.assign({}, {})
        // currentProject:''
    })
  }

  changePortlet(portletName){
    this.resetCurrentProject();
    this.setState({
      portlet:portletName
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
      this.setState({
        projects:[...this.state.projects,data.data],
        currentProject:data.data
      })
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  addRecordsToProject(records, proId){
    axios.defaults.withCredentials = true;
    axios.post(`http://localhost:3001/projects/update`,
      {
        projectId:proId,
        records:records
      }
    ).then((data)=>{

      let idx= this.state.projects.findIndex((pro)=> pro._id === proId);
      this.setState({
        projects:[...this.state.projects.slice(0, idx),
          Object.assign({}, this.state.projects[idx], {records:data.data}),
          ...this.state.projects.slice(idx +1)
        ]
        // projectRecords:Object.assign([], data.data)
      })
      })
      .then(()=>{
        this.changeProject(proId)
      })
      .catch((err)=>{
      console.log(err.status)
      console.log('error adding record to project')
      this.setState({
        error:true
      })
    })
  }

  getMyRecords(){
    axios.defaults.withCredentials = true;
    axios.post(`http://localhost:3001/records/index`
    )
    .then((data)=>{
      this.setState({
        myRecords:Object.assign([], data.data.result)
      })
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

  handlePortletChange(){
    let portlet= this.state.portlet
    switch (portlet) {
      case 'home':
        return (
          <Projects
          projects={this.state.projects}
          addProject={this.addProject}
          changeProject={this.changeProject}
          currentProject={this.state.currentProject}
          agency={this.state.agency}
          records={this.state.myRecords}
          getRecordInfo={this.getRecordSingle}
          addRecordsToProject={this.addRecordsToProject}
          addToCart={this.addToCart}/>
        )
        break;
      case 'cart':
        return (
          <ShoppingCart
          items={this.state.shoppingCart}
          removeItem={this.removeFromCart}
          />
        )
        break;
      default:
        return (
          <Projects
          projects={this.state.projects}
          addProject={this.addProject}
          changeProject={this.changeProject}
          currentProject={this.state.currentProject}
          agency={this.state.agency}
          records={this.state.myRecords}
          getRecordInfo={this.getRecordSingle}
          addRecordsToProject={this.addRecordsToProject}
          addToCart={this.addToCart}/>
        )
    }
  }


  handleLogout(e){
    e.preventDefault();
    axios.get('http://localhost:3001/logout')
    .then((data)=>{
      this.setState({
        user:'',
        records:[],
        currentRecord:{},
        asiFields:[],
        currentProject:{}
      }, localStorage.removeItem("user"))
    })
    .catch((err)=>{
      console.log('error logging out');
      console.log(err)
    })
  }


render(){
  let currentPort= this.handlePortletChange()
  return(
    <div className="Dashboard">
      {this.state.user ?
        <div className="main-container">
          <MainNav
            handleLogout={this.handleLogout}
            resetCurrentProject={this.resetCurrentProject}
            changePortlet={this.changePortlet}
            />
        <div className="main-dash">
            <Username
            username={this.state.user} />
            {currentPort}
            {this.state.currentProject ? null :
              <RecordsList
              records={this.state.myRecords}
              getRecordInfo={this.getRecordSingle}
              current={this.state.currentRecord}
              home={true}/>
            }

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
