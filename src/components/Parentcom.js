// ParentComponent.js
import React, { useContext } from 'react';
import UploadForm from './Uploadform';
import { MetamaskContext } from './Metamask';

const ParentComponent = () => {
  const { accounts } = useContext(MetamaskContext);

  return (
    <div>
      <UploadForm accounts={accounts} />
    </div>
  );
};

export default ParentComponent;
