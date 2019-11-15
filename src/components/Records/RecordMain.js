import React from 'react';
import Location from './Location.js';
import Contacts from './Contacts/Contacts.js';
import ASI from './CustomFields/ASI.js';
import '../RecordMain.css'

const RecordMain= (props)=>{

  return(
    <div className='record-main'>
    {props.description ?
      <div>
      <label>Description: </label> <p>{props.description}</p>
      </div> : null}

      {Object.keys(props.addresses).length > 0 ?
        <section>
          <Location locationInfo={props.addresses.addresses} />
        </section> : null
      }
      {Object.keys(props.contacts).length > 0 ?
        <section>
          <Contacts list={props.contacts.contacts} />
        </section> : null
      }
      {Object.keys(props.owners).length > 0 ?
        <section>
          <Contacts list={props.owners.owners} />
        </section> : null
      }
      <ASI recordId={props.recordId} canEdit={props.canEdit} className="asi"/>
    </div>
  )

}

export default RecordMain;
