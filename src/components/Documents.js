import React from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';


const Documents=(props)=>{
  const documentsList=Object.keys(props.docs).length > 0 ? props.docs.documents.map((doc, index)=>{
    return(
      <tr key={index}>
        <td>{doc["entityType"]}</td>
        <td>{doc["fileName"]}</td>
        <td>{doc["uploadedDate"]}</td>
      </tr>
    )
  }) : 'No documents found on this record';

    return(
      <div>
        <div>
          <MaterialIcon icon="note_add">Add Document</MaterialIcon>
        </div>
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
      </div>
    )

}

export default Documents
