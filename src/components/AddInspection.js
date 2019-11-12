import React, {Component} from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'


class AddInspection extends Component{

  constructor(props){
    super(props)
    this.state=({
      sdate: new Date(),
      inspType:''
    })
    this.handleChange= this.handleChange.bind(this)
    this.handleDateChange=this.handleDateChange.bind(this)
    this.handleSubmit= this.handleSubmit.bind(this)
  }

  handleChange(e){
    e.preventDefault();
    let value= e.target.value;
    let name= e.target.name;
    this.setState({
      [name]:value
    })
  }
  handleDateChange(date){
    this.setState({
      sdate:date
    })
  }

  handleSubmit(e){
    e.preventDefault();
    let typeInfo=this.props.types.find(insp => insp.value === this.state.inspType);
    let info=Object.assign({}, {id: typeInfo.id, text: typeInfo.text, group:typeInfo.group, value:typeInfo.value})
    this.props.handleSubmit(info, this.state.sdate)
  }

render(){
  const types= this.props.types.map((type, index)=>{
    return(
      <option key={index}>
        {type.value}
      </option>
    )
  })

    return(
        <form className="add-form">
          <select name="inspType" onChange={this.handleChange} value={this.state.inspType}>
            {types}
          </select>
          <div>
          <label>
            Inspection Date
          </label>
          <DatePicker
            selected={this.state.sdate}
            onChange={this.handleDateChange}
          />
          </div>
          <button className="material"><MaterialIcon icon="schedule" onClick={this.handleSubmit}/></button>
        </form>
    )

  }
}

export default AddInspection;
