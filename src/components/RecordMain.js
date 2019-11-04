import React from 'react';
import Location from './Location.js';
import Contacts from './Contacts/Contacts.js';

const RecordMain= (props)=>{

  return(
    <div>
      <section>
        <div>
          <label>File Date: </label> <p>{props.openedDate}</p>
        </div>
        <div>
          <label>Description: </label> <p>{props.description}</p>
        </div>
      </section>
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
    </div>
  )

}

export default RecordMain;
