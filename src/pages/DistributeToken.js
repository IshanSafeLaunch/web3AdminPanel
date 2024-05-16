import React, { useState,useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Head from '../components/Head';
import supabase from "../config/supabaseClient";
import './dt.css';



const TokenDistribution = () => {
  // State to manage selected distribution
  const [selectedDistribution, setSelectedDistribution] = useState(null);
  // State to manage deposit details
  const [deposits, setDeposits] = useState([]);
  const [distributorOptions, setDistributorOptions] = useState([]);

  // Function to handle distribution selection
  const handleDistributionChange = (event) => {
    setSelectedDistribution(event.target.value);
    // Fetch deposit details for the selected distribution and set it in the 'deposits' state
    // You would typically fetch this data from an API endpoint
  };

  useEffect(() => {
    fetchDistributors();
  }, []);

  const fetchDistributors = async () => {
    try {
      const { data, error } = await supabase.from('deals').select('*');
      if (error) {
        throw error;
      }
      console.log("Datavase", data);
      setDistributorOptions(data);
    } catch (error) {
      console.error('Error fetching distributor options:', error.message);
    }
  };

  // Function to handle token removal
  const removeToken = () => {
    // Logic to remove token based on deposit ID
  };

  // Render deposit details
  const renderDepositDetails = () => {
    const project = distributorOptions.find(project => project.project_name === selectedDistribution);

  if (!project) {
    return null; // If no selected distributor, return null or any default message
  }
    return (
      <div className='container' key={project.id}>
        
        {/* Details at the center */}
        <div className='project-info' style={{ textAlign: 'center' }}>
          <div><b>{project.project_name}</b></div>
          <div>Distribution ID: {project.id}</div>
          <div>Contract Address: <b style={{ color: '#1888d8' }}>{project.contract_address}</b></div>
        </div>
        <div className='additional-info'>
          {/* Details at the left side */}
          <div>Fundraise Amount: {}</div>
          <div>No of Token Withdrawal: {}</div>
          <div>Created By: <b style={{ color: '#1888d8' }}>{project.project_address}</b></div>
        </div>
        {/* Remove token button */}
        {/* <button onClick={() => removeToken()}>Remove Token</button> */}
      </div>
    );
  };

  return (
    <div>
      <Head />
      {/* <Header className="fixed-header"/> */}
    <div>
      <h2 className='header'>Distribute Tokens</h2>
      <header className='container'>
        <div>Select Distributor</div>
        <select className='select' value={selectedDistribution} onChange={handleDistributionChange}>
        <option value="">Select...</option>
        {distributorOptions.map((projects) => (
              <option key={projects.id} value={projects.project_name}>{projects.project_name}</option>
              
            ))}
        </select>
      </header>
      {selectedDistribution && (
        <div>
         {/* <h4>Selected Distributor: {selectedDistribution}</h4> */}
        {renderDepositDetails()}
       
      </div>
      )}
      <div>
        <h3>Deposit Details</h3>
        {/* Input fields for amount and unlock date time */}
      </div>
    </div>
  </div>
  );
};

export default TokenDistribution;
