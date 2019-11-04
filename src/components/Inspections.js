import React, {Component} from 'react'



//export default class Inspections extends Component{

const Inspections= (props)=>{
    const inspectionsList = props.list.inspections.length>0 ? props.list.inspections.map((insp, index)=>{
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
        <div>
          <button>Request An Inspection</button>
          <button>Request to Reschedule</button>
        </div>
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
      </div>
    )
  }

export default Inspections;
