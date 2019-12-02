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
    const recordsList = this.props.data ? this.props.data.filter(rec => rec.status === 200).flat() : [];
    const inspections = recordsList.length > 0 ? recordsList.filter(rec => rec.result) : [];
    const inspectionsList = inspections.length>0 ? inspections.map((insp, index)=>{
        return(
          <tr key={index}>
            <td>{insp['type']['value']}</td>
            <td>{insp['status']['value']}</td>
            <td>{insp['scheduleDate']}</td>
          </tr>
      )
    }): <td className="extend-cell">No Inspections found</td>


    return(
      <div className="details-container">
        <table className="text-sm">
          <tbody>
            <tr className="table-header">
              <th>Inspection Type</th>
              <th>Status</th>
              <th>Scheduled | Status Date</th>
            </tr>
            {inspectionsList}
          </tbody>
        </table>
        {inspections.length>0 ?
              <AddInspection types={this.props.types.inspectionTypes[0].inspectionTypes} handleSubmit={this.handleSubmit}/> : null
        }

      </div>
    )

    }
  }

export default Inspections;
