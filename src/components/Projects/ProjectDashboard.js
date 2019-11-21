import React, {Component} from 'react';
import axios from 'axios';
import Activity from '../Workflow/Activity';
import Fees from '../Fees';
import Inspections from '../Inspections/Inspections'

export default class ProjectDashboard extends Component{
  constructor(props){
    super(props)
    this.state={
      pFees:[],
      pInspections:[],
      pWorkflows:[],
      pCommunications:[],
      gotData:false
    }
    this.getProjectDetails=this.getProjectDetails.bind(this)
    this.handlePortletClick=this.handlePortletClick.bind(this)
    this.handleTileClick=this.handleTileClick.bind(this)
  }

  componentDidMount(){
    this.getProjectDetails(this.props.projRecords)
  }

  getProjectDetails(recs){
    let records=recs;
    axios.defaults.withCredentials = true;
    axios.post(`http://localhost:3001/records/getRecordsInfo`,
      {records}
    ).then((data)=>{
      this.setState({
        pFees:Object.assign([], data.data.fees),
        pInspections:Object.assign([], data.data.insp),
        pWorkflows:Object.assign([], data.data.wf)
      })
    })
    .then((data)=>{
      this.setState({
        gotData:true,

      })
    }).catch((err)=>{
      console.log("error getting project details")
    })
  }

  handlePortletClick(e){
    let targ=e.innerText;
    this.setState({
      portlet:e.toLowerCase()
    })
  }


  portlets(portlet){
    switch(portlet){
      case 'track':
        return (<Activity data={this.state.pWorkflows} />);
      case 'fees & payments':
          return (<Fees data={this.state.pFees} />);
      case 'inspections':
            return (<Inspections data={this.state.pInspections}/>)
    }
  }

  render(){

    return(
      <div className="project-dashboard">
        <div className="project-name">
          {this.props.name}
        </div>
        <div clasaName="project-mainNav">
          <button onClick={this.handlePortletClick}>Track</button>
          <button onClick={this.handlePortletClick}>Fees & Payments</button>
          <button onClick={this.handlePortletClick}>Inspections</button>
        </div>
        {this.state.gotData  ?
            <Activity data={this.state.pWorkflows}/> : null
        }
      </div>
    )
  }

}
