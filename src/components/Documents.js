import React,{Component} from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';


//const Documents=(props)=>{

class Documents extends Component{

  constructor(props){
    super(props)
    this.state={
      val:''
    }
    this.handleSelectionChange=this.handleSelectionChange.bind(this)
    this.handleDoc=this.handleDoc.bind(this)
  }

  handleSelectionChange(e){
      e.preventDefault();
      this.setState({
        val:e.target.value
      })
  }

  handleDoc(e){
    e.preventDefault();
    this.props.addDoc(this.state.val)
  }

  render(){
  const documentsList=Object.keys(this.props.docs).length > 0 ? this.props.docs.documents.map((doc, index)=>{
    return(
      <tr key={index}>
        <td>{doc["entityType"]}</td>
        <td>{doc["fileName"]}</td>
        <td>{doc["uploadedDate"]}</td>
      </tr>
    )
  }) : 'No documents found on this record';
  const categories=this.props.categories.documentCategories.length > 0 ? this.props.categories.documentCategories.map((cat, index)=>{
    return(
      <option key={index}>
        {cat.text}
      </option>
    )
  }) : null
    return(
      <div>
        <table>
          <tbody>
            <tr>
              <th>Document Type</th>
              <th>Document Name</th>
              <th>Uploaded Date</th>
            </tr>
            {documentsList}
          </tbody>
        </table>
        <form>
          <select name="docType" onChange={this.handleSelectionChange} value={this.state.val}>
            {categories}
          </select>
          <MaterialIcon icon="note_add" onClick={this.handleDoc}>Add Document</MaterialIcon>
        </form>
      </div>
    )
  }
}

export default Documents
