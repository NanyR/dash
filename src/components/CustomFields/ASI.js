import React, {Component} from 'react';
import axios from 'axios';
import ASIList from './ASIList.js';
import '../../Asi.css';

export default class ASI extends Component{

  constructor(props){
    super(props)
    this.state={
      show:false,
      asiFields:[],
      updated:''
    }
    this.handleClick=this.handleClick.bind(this)
    this.getCustomForms=this.getCustomForms.bind(this)
    this.handleResponse=this.handleResponse.bind(this)
    this.handleInputChange=this.handleInputChange.bind(this)
    this.handleFieldChange=this.handleFieldChange.bind(this)
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.recordId !== this.props.recordId){
      this.setState({
        show:false
      })
    }
  }

  handleClick(e){
    e.preventDefault();
    if(!this.state.show){
      this.getCustomForms(this.props.recordId);
    }else{
      this.setState({
        show:false
      })
    }
  }

  handleInputChange(val, label, id){
    this.handleFieldChange(val, label, id)
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


  getCustomForms(record){
    axios.defaults.withCredentials = true;
    axios.post(`http://localhost:3001/recordCustomForm`,
      {record}
    ).then(function(data){
      let result=Object.keys(data.data).length>0 ? data.data.customForms : [];
      return(result)
    }.bind(this))
    .then(function(result){
        this.handleResponse(result)
    }.bind(this))
    .catch(err=>{
      console.log(`error getting custom forms`)
    })
  }

  handleCustomFormsSubmit(fields){
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/updateCustomForm',
    {
      fields:fields,
      record:this.props.recordId
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

  handleResponse(data){
    this.setState({
      asiFields:Object.assign([], data),
      show:true
    })
  }

  render(){
    return(
      <div>
        <button onClick={this.handleClick}>Additional Information</button>
        {this.state.show ?
          <div className="asi-container">
            <ASIList asiFields={this.state.asiFields} canEdit={this.props.canEdit}/>
          </div> :null}
      </div>
    )
  }

}
