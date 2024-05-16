import React from 'react'

const Head = ({accounts}) => {
    const account=accounts;
    // console.log('head',account);
  return (
    <div>
        <h1>Connected Account -{account}</h1>
    </div>
  )
}

export default Head;