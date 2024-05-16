

import React from 'react';

const Sidebar = () => {

  return (
    <div className="sidebar" style={{ boxShadow: '2px 0px 4px rgba(0, 0, 0, 0.1)', height: 'calc(100vh - 60px)', width: '200px', backgroundColor: '#f0f0f0', position: 'fixed', top: '60px', left: 0 }}>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ padding: '10px 20px', borderBottom: '1px solid #ccc' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#333' }}>Create Distribution</a>
        </li>
        <li style={{ padding: '10px 20px' }}>
          <a href="/distribution-token" style={{ textDecoration: 'none', color: '#333' }}>Deposit Token</a>
        </li>
        <li style={{ padding: '10px 20px' }}>
          <a href="/dashboard" style={{ textDecoration: 'none', color: '#333' }}>Create Deal</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
