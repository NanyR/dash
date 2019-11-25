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
      gotData:false,
      current:""
    }
    this.getProjectDetails=this.getProjectDetails.bind(this)
    this.handlePortletClick=this.handlePortletClick.bind(this)
    this.portlets=this.portlets.bind(this)
    // this.handleTileClick=this.handleTileClick.bind(this)
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
        pWorkflows:Object.assign([], data.data.wf),
        current:'track'
      })
    })
    .then((data)=>{
      this.setState({
        gotData:true
      })
    }).catch((err)=>{
      console.log("error getting project details")
    })
  }

  handlePortletClick(e){
    let name=e.target.innerText.toLowerCase();
    this.setState({
      current:name
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
    this.setState({
      current:portlet
    })
  }

  render(){
    const currenPortlet= this.state.gotData ? this.portlets(this.state.current) : null
    return(
      <div className="project-dashboard">
        <div className="project-name">
          {this.props.name}
        </div>
        <div className="project-mainNav">
          <button onClick={this.handlePortletClick}>Track</button>
          <button onClick={this.handlePortletClick}>Fees & Payments</button>
          <button onClick={this.handlePortletClick}>Inspections</button>
        </div>

        {currenPortlet}
      </div>
    )
  }

}
