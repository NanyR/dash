import React, {Component} from 'react';


import Input from './Input.js';

export default class ASIGroup extends Component {

  constructor(props){
    super(props)
    this.state={
      // fields:this.props.info
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  handleChange(e, label){
    e.preventDefault();
    let val= e.target.value;
    this.props.handleInputChange(val,label, this.props.info.id);
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.handleCustomFormsSubmit(this.props.info)
  }

  render(){
    const title=this.props.info.id.replace(/.c/g,' ');
    const i= title.indexOf('-');
    const truncTitle= i >=0 ? title.slice(i+1): title;
    const formDetails= Object.keys(this.props.info).map((key, index)=>{
      if(key != 'id'){
      return (
          <Input iType='text' iValue={this.props.info[key]} iLabel={key} index={index} canEdit={this.props.canEdit} handleChange={this.handleChange}/>
      )}
    })

    return(
      <div>
        {truncTitle}
        <form onSubmit={this.handleSubmit}>
          {formDetails}
        {this.props.canEdit ? <button>UPDATE</button> : null}  
        </form>
      </div>
    )
    }
}
