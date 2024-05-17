import React from 'react'
import UploadForm from './Uploadform';

const Head = ({accounts}) => {
    const account=accounts;
    // console.log('head',account);
  return (
    <div>
        <h1>Connected Account -{account}</h1>
        {/* <UploadForm accounts={accounts} /> */}
    </div>
  )
}

export default Head;