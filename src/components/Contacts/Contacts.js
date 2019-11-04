import React from 'react';
import Contact from './Contact.js'

const Contacts = (props)=>{
  const contacts = props.list.map((contact, index)=>{
    return(
      <Contact key={index} info={contact} />
    )
  })
  return(
    <div>
      {contacts}
    </div>
  )

}


export default Contacts
