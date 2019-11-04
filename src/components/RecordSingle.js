import React,{Component} from 'react';
import ASIGroup from './ASIGroup.js';
import Inspections from './Inspections.js';
import Fees from './Fees.js';
import RecordNav from './RecordNav.js';
import RecordMain from './RecordMain.js';

import axios from 'axios';

export default class RecordSingle extends Component{

  constructor(props){
    super(props)
    this.state={
      updated:false,
      asiFields:[],
      portlet:'Record',
      location:{},
      contacts:{},
      documents:{},
      inspections:{},
      fees:{}
    }
    this.handleCustomFormsSubmit=this.handleCustomFormsSubmit.bind(this)
    this.handleInputChange=this.handleInputChange.bind(this)
    this.handleButtonClick=this.handleButtonClick.bind(this)
    this.getRecordInfo=this.getRecordInfo.bind(this);
    this.handleFieldChange= this.handleFieldChange.bind(this);
    // this.handleSectionClick= this.handleSectionClick.bind(this);
    this.getRecordInfo= this.getRecordInfo.bind(this);
    this.handleResponse= this.handleResponse.bind(this)
  }



  getRecordInfo(param, record){
    axios.defaults.withCredentials = true;
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
        })
        break;
      default:
        this.setState({
          [param]: Object.assign({}, data)
        })
    }
  }





  handleInputChange(val, label, id){
    this.props.handleFieldChange(val, label, id)
  }

  getRecordASI(e){
    e.preventDefault();
    axios.defaults.withCredentials = true;
    let recordId=this.props.recDetails.id;
    axios.post('http://localhost:3001/recordCustomForm',
    {recordId}
    ).then(function(data){
      this.setState({
        asiFields:Object.assign([], data.data.result),
        current:'custom fields'
      })
    }.bind(this))
    .catch(err=>{
      console.log('error')
    })
  }

  handleFieldChange(val, label, id){

    let idx=this.state.asiFields.findIndex(group => group.id === id );
    console.log(idx)
    this.setState({
      asiFields:[...this.state.asiFields.slice(0, idx),
        {...this.state.asiFields[idx],
         [label]: val},
        ...this.state.asiFields.slice(idx+1)]
    })
  }

  handleCustomFormsSubmit(fields){
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/updateCustomForm',
    {
      fields:fields,
      record:this.props.recDetails.id
      }
    )
    .then((data)=>{
      if(data.data.result[0].isSuccess){
        this.setState({
          updated:true
        })
      }
    })
    .catch(err=>{
      console.log('ERROR')
    })
  }


  handleButtonClick(e){
    e.preventDefault();
    let action= e.target.innerText;
    this.setState({
      portlet: action
    })
  }

  updatePortlet(){
    switch (this.state.portlet) {
      case 'Record':
        return(
          <RecordMain
          openedDate={this.props.recDetails.openedDate}
          description={this.props.recDetails.description}
          addresses={this.props.recDetails.main[0]}
          contacts={this.props.recDetails.main[1]}
          owners={this.props.recDetails.main[2]}
          />
        );
          break;
        case 'Inspections':
        return (
          <Inspections
          list={this.state.inspections}
          />
        )
        break;
      default:

    }
  }

  render(){
      // const asi=this.state.asiFields.map((group, index)=>{
      //   return(<ASIGroup info={group} key={index} canEdit={this.props.canEdit} handleCustomFormsSubmit={this.handleCustomFormsSubmit} handleInputChange={this.handleInputChange}/>)
      // })

      return(
        <div>
          <header>
              <h2>{this.props.recDetails.customId}</h2>
              <h3>{this.props.recDetails.type.alias}</h3>
          </header>
          {this.props.recDetails.customId.includes('TMP')? null :
            <RecordNav
            portlet={this.state.portlet}
            handleButtonClick={this.handleButtonClick} />
            }
          {this.state.portlet === 'Record' ?
              <RecordMain
              openedDate={this.props.recDetails.openedDate}
              description={this.props.recDetails.description}
              addresses={this.props.recDetails.main[0]}
              contacts={this.props.recDetails.main[1]}
              owners={this.props.recDetails.main[2]}
              />
            : null}


        </div>
      )
    }
}
