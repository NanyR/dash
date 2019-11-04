import React from 'react'


const Documents=(props)=>{
  const documentsList=props.list.map((doc, index)=>{
    return(
      <tr key={index}>
        <td>{doc["entityType"]}</td>
        <td>{doc["fileName"]}</td>
        <td>{doc["uploadedDate"]}</td>
      </tr>
    )
  })

    return(
      <div>
        <div>
          <button>Add Document</button>
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

export Documents
