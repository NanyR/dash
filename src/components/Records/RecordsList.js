import React, {Component} from 'react';
import '../../RecordsList.css';
import Record from './Record.js'

class RecordsList extends  Component{
// const RecordsList= (props)=>{
  constructor(props){
    super(props)
    this.state={
      checkedRecords:[],
      showList:false
    }
    this.addToCheckedRecords=this.addToCheckedRecords.bind(this)
    this.addRecordsToProject=this.addRecordsToProject.bind(this)
    this.toggleList=this.toggleList.bind(this)
  }

  toggleList(){
    this.setState({
      showList:this.state.showList ? false : true
    })
  }

  addToCheckedRecords(recId, add){
    if(add){
      this.setState({
        checkedRecords:[...this.state.checkedRecords, recId]
      })
    }else{
      let idx= this.state.checkedRecords.findIndex((rec)=> rec===recId);
      this.setState({
        checkedRecords:[...this.state.checkedRecords.slice(0, idx),
          ...this.state.checkedRecords.slice(idx+1)]
      })
    }
  }

  addRecordsToProject(){
    this.props.addRecordsToProject(this.state.checkedRecords)
  }
  // const recordLabels=props.current.id ? <div><div className="current-record text-sm">{props.current.customId}</div> <button className="button-small" onClick={props.resetRecords}>Records</button></div>: props.records.map((record, index)=>{
  //   return(
  //     <Record getRecordInfo={props.getRecordInfo} key={index} id={record.id} customId={record.customId} alias={record.type.alias} current={record.id===props.current.id}/>
  //     )
  // })
  render(){
    const recordLabels=this.props.records.map((record, index)=>{
      return(
        <Record getRecordInfo={this.props.getRecordInfo} key={index} id={record.id} customId={record.customId} alias={record.type.alias} current={record.id===this.props.current.id}
        handleCheckboxChange={this.addToCheckedRecords}
        home={this.props.home}/>
        )
    })
    return(
      <div>
      <button onClick={this.toggleList}>{this.state.showList ? "Hide" : "Show"} my Records</button>
      {this.state.showList ?
        <div className="records-list">
          <header>My Records</header>
            {this.props.home ? null :
              <button onClick={this.addRecordsToProject} >Add records to project</button>
            }
              {recordLabels}
        </div>
        : null
      }
  </div>
    )}
}

export default RecordsList;
