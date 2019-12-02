import React, {Component} from 'react';


//const ContentTable=(props)=>{

class ContentTable extends Component{

  constructor(props){
    super(props)

    this.getHeaders=this.getHeaders.bind(this)
    this.getContent=this.getContent.bind(this)

  }


  getHeaders(cType){
    switch(this.props.current){
      case "in review":
        return (<tr className="table-header"><th>Record Id</th><th> Task</th><th>Status</th><th>Due Date</th><th>Actions</th></tr>)
        break;
      case "action required":
        return (<tr className="table-header"><th>Record Id</th><th>Task</th><th>Status</th><th>Due Date</th><th>Actions</th></tr>)
        break;
      case ("approved"):
        return (<tr className="table-header"><th>Record Id</th><th>Task</th><th>Status</th><th>Status Date</th><th>Actions</th></tr>)
        break;
        case ("denied"):
          return (<tr className="table-header"><th>Record Id</th><th>Task</th><th>Status</th><th>Status Date</th><th>Actions</th></tr>)
          break;
    }

  }

  getContent(){
    const cType= this.props.current;
    const content=this.props.content.map((task)=>{
      return(
        <tr>
          <td>{task[0].recordId.customId}</td>
          <td>{task[0].description}</td>
          <td>{cType==="in review" ? "Pending Review" : task[0].status.value}</td>
          <td>{cType=== ("approved" || "denied") ? task[0].statusDate : task[0].dueDate}</td>
          <td></td>
        </tr>
      )
    })
    return content;
  }


    render(){
      const tcontent= this.getContent()
      const headers= this.getHeaders()
      return(
        <table className="text-sm">
          <tbody>
            {headers}
            {tcontent}
          </tbody>
        </table>

      )
  }
}

export default ContentTable;
