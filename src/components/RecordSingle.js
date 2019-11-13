import React,{Component} from 'react';

import Inspections from './Inspections.js';
import Fees from './Fees.js';
import RecordNav from './RecordNav.js';
import RecordMain from './RecordMain.js';
import Workflow from './Workflow.js';
import Documents from './Documents.js';
import '../RecordSingle.css'

import axios from 'axios';

export default class RecordSingle extends Component{

  constructor(props){
    super(props)
    this.state={
      updated:false,
      asiFields:[],
      portlet:this.props.portlet,
      location:{},
      contacts:{},
      documents:{},
      inspections:{},
      fees:{},
      processingstatusdetails:{},
      statuses:[],
      currentWF:''
    }
    this.handleButtonClick=this.handleButtonClick.bind(this)
    this.getRecordInfo=this.getRecordInfo.bind(this);
    this.handleResponse= this.handleResponse.bind(this);
    this.updatePortlet=this.updatePortlet.bind(this)
    this.handleInspectionRequest=this.handleInspectionRequest.bind(this);
    this.addDocRequest=this.addDocRequest.bind(this);
    this.getStatuses=this.getStatuses.bind(this);
    this.handleWFStatuses=this.handleWFStatuses.bind(this);
    this.workflowUpdate=this.workflowUpdate.bind(this);
    this.handleWFUpdate=this.handleWFUpdate.bind(this)
  }

componentDidUpdate(prevProps, prevState){
  if(prevProps.recDetails.id !== this.props.recDetails.id){
    this.getRecordInfo(this.state.portlet, this.props.recDetails.id)
  }

}

workflowUpdate(id, status){
  axios.defaults.withCredentials = true;

  axios.post(`http://localhost:3001/updateWFStatus`,
    {
      "record":this.props.recDetails.id,
      "id": id,
      body:{
      	"status":{
      			"value": status,
            "text": status
      	}
      }
    }
  ).then(function(data){
    this.handleWFUpdate(data)
  }.bind(this))
  .catch(err=>{
    console.log(`error`)
  })
}

handleWFUpdate(info){
  let wf= this.state.processingstatusdetails.workflowTasks.findIndex((wf)=> wf.id === info.data.id);
  if(wf !== -1){
    let updatedWF=[...this.state.processingstatusdetails.workflowTasks.slice(0, wf), info.data, ...this.state.processingstatusdetails.workflowTasks.slice(wf+1)]
    
    this.setState({
      processingstatusdetails: {
        ...this.state.processingstatusdetails,
        workflowTasks:updatedWF
      }
    })
  }
}


addDocRequest(type){
  debugger
}


  handleInspectionRequest(type, date){
    axios.defaults.withCredentials = true;
    axios.post(`http://localhost:3001/inspectionRequest`,
      {
        "desiredDate": date,
        "recordId": {
        "id": this.props.recDetails.id
        },
        "type":type
        }
    ).then(function(data){
      debugger
    }.bind(this))
    .catch(err=>{
      console.log(`error`)
    })
  }

  getRecordInfo(param, record){
    axios.defaults.withCredentials = true;
    param= param.replace(/\s/g,"");
    axios.post(`http://localhost:3001/${param}`,
      {record}
    ).then(function(data){

      this.handleResponse(param, data.data)
    }.bind(this))
    .catch(err=>{
      console.log(`error getting ${param}`)
    })
  }

  handleResponse(param, data){

    switch(param){
      case 'main':
        this.setState({
          location:Object.keys(data[0]).length > 0 ? Object.assign({}, data[0].addresses[0]): {},
          contacts: Object.keys(data[1]).length > 0 ? Object.assign({}, data[1].contacts): {},
          owners:Object.keys(data[2]).length > 0 ? Object.assign({}, data[2].owners): {}
        },()=>{
          this.setState({
            portlet:'record'
          })
        })
        break;
      default:
        this.setState({
          [param]: Object.assign({}, data)
        },()=>{
          this.setState({
            portlet:param
          })
        })
    }
  }

handleWFStatuses(statuses){
  this.setState({
    statuses:Object.assign([], statuses)
  })
}

getStatuses(id){
  this.setState({
    currentWF:id
  })
  axios.defaults.withCredentials = true;
  axios.post(`http://localhost:3001/getWorkflowStatuses`,
    {
      record:this.props.recDetails.id,
      id:id
    }
  ).then(function(data){
    this.handleWFStatuses(data.data)
  }.bind(this))
  .catch(err=>{
    console.log(`error getting workflow statuses`)
  })
}


  handleButtonClick(e){
    e.preventDefault();
    let action= e.target.innerText;
    this.getRecordInfo(action.toLowerCase(), this.props.recDetails.id)

  }

  updatePortlet(){
    switch (this.state.portlet) {
      case 'record':
        return(
          <RecordMain
          openedDate={this.props.recDetails.openedDate}
          description={this.props.recDetails.description}
          addresses={this.props.recDetails.main[0]}
          contacts={this.props.recDetails.main[1]}
          owners={this.props.recDetails.main[2]}
          recordId={this.props.recDetails.id}
          canEdit={this.props.canEdit}
          />
        );
          break;
      case 'inspections':
            return (
            <Inspections
            list={this.state.inspections[0]}
            types={this.state.inspections[1]}
            handleInspectionRequest={this.handleInspectionRequest}
            agency={this.props.agency}
            />
            )
          break;
      case 'fees':
        return (
          <Fees
          feesList={this.state.fees}
          agency={this.props.agency}
          />
        )
          break;
      case 'processingstatusdetails':
          return (
              <Workflow
              tasks={this.state.processingstatusdetails}
              agency={this.props.agency}
              getStatuses={this.getStatuses}
              current={this.state.currentWF}
              statuses={this.state.statuses}
              workflowUpdate={this.workflowUpdate}
              />
          )
          break;
      case 'documents':
          return (
              <Documents
              docs={this.state.documents[0]}
              categories={this.state.documents[1]}
              addDoc={this.addDocRequest}
              agency={this.props.agency}
              />
          )
          break;
    }
  }

  render(){
    const portlet= this.updatePortlet();


      return(
        <div className='RecordSingle'>
          <header>
              <h2>{this.props.recDetails.customId}</h2>
              <h3>{this.props.recDetails.type.alias}</h3>
              <p>File Date: {this.props.recDetails.openedDate}</p>
          </header>
          {this.props.recDetails.customId.includes('TMP')? null :
            <RecordNav
            portlet={this.state.portlet}
            handleButtonClick={this.handleButtonClick} />
            }
            {portlet}
        </div>
      )
    }
}
