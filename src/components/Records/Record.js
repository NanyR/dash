import React, {Component} from 'react'


class Record extends Component{
// const Record = (props)=>{
  constructor(props){
    super(props)
    this.handleCheckboxChange=this.handleCheckboxChange.bind(this)
  }

  handleCheckboxChange(e){
    let add= e.target.checked;
    this.props.handleCheckboxChange(this.props.id, add)
  }

  render(){

  return(
    <div className="record-result">
      <div onClick={()=>this.props.getRecordInfo(this.props.id)} current={this.props.current} className="record-label">
        <p className="text-sm lighter">{this.props.customId}</p>
        <p className="text-med">{this.props.alias}</p>
      </div>
      {this.props.home ? null :
        <input type='checkbox' name="addRec" onChange={this.handleCheckboxChange}/>
      }
    </div>
  )}
}


export default Record
