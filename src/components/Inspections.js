import React, {Component} from 'react';

import AddInspection from './AddInspection.js'




//export default class Inspections extends Component{

//const Inspections= (props)=>{
class Inspections extends Component{

  constructor(props){
    super(props)

    this.handleSubmit= this.handleSubmit.bind(this)
  }


  handleSubmit(info, date){
    this.props.handleInspectionRequest(info, date)
  }

  render(){
    
    const inspectionsList = Object.keys(this.props.list).length>0 ? this.props.list.inspections.map((insp, index)=>{
      return(
        <tr key={index}>
          <td>{insp['type']['value']}</td>
          <td>{insp['status']['value']}</td>
          <td>{insp['scheduleDate']}</td>
        </tr>
      )
    }): 'No Inspections on this record';



    return(
      <div>

        <table>
          <tbody>
            <tr>
              <th>Inspection Type</th>
              <th>Status</th>
              <th>Scheduled | Status Date</th>
            </tr>
            {inspectionsList}
          </tbody>
        </table>
        {Object.keys(this.props.types).length>0  ?
              <AddInspection types={this.props.types.inspectionTypes[0].inspectionTypes} handleSubmit={this.handleSubmit}/> : null
        }

      </div>
    )

    }
  }

export default Inspections;
