import React from 'react';

const RecordNav = (props)=>{

  return(
    <section >
      <button onClick={props.handleButtonClick} className={props.portlet === 'Inspections' ? 'active-portlet' : 'inactive-portlet'}>Inspections</button>
      <button onClick={props.handleButtonClick} className={props.portlet === 'Fees' ? 'active-portlet' : 'inactive-portlet'}>Fees</button>
      <button onClick={props.handleButtonClick} className={props.portlet === 'Record' ? 'active-portlet' : 'inactive-portlet'}>Record</button>
      <button onClick={props.handleButtonClick} className={props.portlet === 'Processing' ? 'active-portlet' : 'inactive-portlet'}>Processing Status Details</button>
      <button onClick={props.handleButtonClick} className={props.portlet === 'Documents' ? 'active-portlet' : 'inactive-portlet'}>Documents</button>
    </section>
  )

}

export default RecordNav;
