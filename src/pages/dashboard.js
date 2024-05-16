import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

import Header from '../components/Header';
import './dashboard.css';
import supabase from "../config/supabaseClient";

function CreateDealForm({accounts}) {
  const [projectName, setProjectName] = useState('');
  const [ido, setIdo] = useState(false);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [vestingSchedule, setVestingSchedule] = useState('');
  const [discordinviteUrl, setDiscordinviteUrl] = useState('');
  const [saftSize, setSaftSize] = useState('');
  const [fee, setFee] = useState('');
  const [minAllocation, setMinAllocation] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  const [chainId, setChainId] = useState('');
  const [telegramUrl, setTelegramUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [whitepaperUrl, setWhitepaperUrl] = useState('');
  const [discordUrl, setDiscordUrl] = useState('');
  const [startTime, setStartTime] = useState('');

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleIdoChange = (event) => {
    setIdo(event.target.checked);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleVestingScheduleChange = (event) => {
    setVestingSchedule(event.target.value);
  };

  const handleDiscordinviteUrlChange = (event) => {
    setDiscordinviteUrl(event.target.value);
  };

  const handleSaftSizeChange = (event) => {
    setSaftSize(event.target.value);
  };

  const handleFeeChange = (event) => {
    setFee(event.target.value);
  };

  const handleMinAllocationChange = (event) => {
    setMinAllocation(event.target.value);
  };

  const handleLogoUrlChange = (event) => {
    // const value = event.target.value;
    setLogoUrl(event.target.value);
    // Check if the entered value is a valid URL
    // if (isValidUrl(value)) {
    //   // If it's a valid URL, set it as the logo URL
    //   setLogoUrl(value);
    // } else {
    //   // If it's not a URL, assume it's a file and handle file upload
    //   const file = event.target.files[0];
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     // Set the uploaded image as the logo URL
    //     setLogoUrl(e.target.result);
    //   };
    //   reader.readAsDataURL(file);
    // }
  };


  const handleChainIdChange = (event) => {
    setChainId(event.target.value);
  };

  const handleTelegramUrlChange = (event) => {
    setTelegramUrl(event.target.value);
  };

  const handleTwitterUrlChange = (event) => {
    setTwitterUrl(event.target.value);
  };

  const handleWebsiteUrlChange = (event) => {
    setWebsiteUrl(event.target.value);
  };

  const handleWhitepaperUrlChange = (event) => {
    setWhitepaperUrl(event.target.value);
  };

  const handleDiscordUrlChange = (event) => {
    setDiscordUrl(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  
  // Function to check if a string is a valid URL
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    // Validation
    if (!projectName || !ido || !description || !price || !vestingSchedule || !saftSize || !fee || !minAllocation || !logoUrl || !chainId || !startTime) {
      alert('Please fill in all mandatory fields.');
      return;
    }
    // Handle form submission here
    const data =  {
      projectName,
      ido,
      description,
      price,
      vestingSchedule,
      discordinviteUrl,
      saftSize,
      fee,
      minAllocation,
      logoUrl,
      chainId,
      telegramUrl,
      twitterUrl,
      websiteUrl,
      whitepaperUrl,
      discordUrl,
      startTime,
    };
    console.log('Consoling Data',data)
    try {
      const { insert,error } = await supabase.from('createdeals').insert([data]);
      if (error) {
        console.log("Error at inserting",error);
    }
    console.log("Inserting data", insert);
 
    //alert('Deal created successfully!');

    }catch(error){
      console.error('Error creating deal:', error.message);
      //alert('An error occurred while creating the deal. Please try again.');
    }

  };

  return (
    <div>
      <div>
      <Header  accounts={accounts}/>
       
      </div>
      <Sidebar/>
     
    <div className="form-container">
      <h1 className="form-header">Create Deal</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="form-label">
          Project Name : <span className="required">*</span>
          <input
            className="form-input"
            type="text"
            value={projectName}
            onChange={handleProjectNameChange}
            placeholder="Enter project name"
            required
          />
        </label>
        </div>
        <div className="form-row">
        <label className="form-label">
        <span className="required">*</span>IDO: &nbsp;
          <input
            type="checkbox"
            checked={ido}
            onChange={handleIdoChange}
          />
        </label>
        </div>
        <div className="form-row">
        <label className="form-label">
          Description : <span className="required">*</span>
          <textarea
            className="form-input"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter description"
            required
          />
        </label>
        </div>
        <div className="form-row">
        <label className="form-label">
          Price : <span className="required">*</span>
          <input
            className="form-input"
            type="text"
            value={price}
            onChange={handlePriceChange}
            placeholder="Enter price"
            required
          />
        </label>    
        <label className="form-label">
          Vesting Schedule : <span className="required">*</span>
          <input
            className="form-input"
            type="text"
            value={vestingSchedule}
            onChange={handleVestingScheduleChange}
            placeholder="e.g., 10% TGE then 8% every 3 weeks"
            required
          />
        </label>
        </div>
        <div className="form-row">
        <label className="form-label">
          Discord Invite URL :
          <input
            className="form-input"
            type="text"
            value={discordinviteUrl}
            onChange={handleDiscordinviteUrlChange}
            placeholder="Enter Discord invite URL"
            
          />
        </label>
        <label className="form-label">
          SAFT Size ($) : <span className="required">*</span>
          <input
            className="form-input"
            type="text"
            value={saftSize}
            onChange={handleSaftSizeChange}
            placeholder="Enter SAFT size"
            required
          />
        </label>
        </div>
        <div className="form-row">
        <label className="form-label">
          Fee % : <span className="required">*</span>
          <input
            className="form-input"
            type="text"
            value={fee}
            onChange={handleFeeChange}
            placeholder="Enter fee percentage"
            required
          />
        </label>
        <label className="form-label">
          Minimum Allocation ($) : <span className="required">*</span>
          <input
            className="form-input"
            type="text"
            value={minAllocation}
            onChange={handleMinAllocationChange}
            placeholder="Enter minimum allocation"
            required
          />
        </label>
        </div>
        <div className="form-row">
            <p><b>We now collect fees for both IDOs and Private deals. For Private Deals we take the fee from the users and for IDOs we take it from the project.<br/> The typical private deal fee is 10% and IDO fee is 7.5% howeever this maye vary. If you aren't 100% sure what the fee percentage is, stop and ask Alex or Imran. DO NOT guess this.</b></p>
        </div>
        <div className="form-row">
        <label className="form-label">
          Logo URL :<span className="required">*</span>
          <div className="custom-dropdown">
            <input
              className="form-input"
              // type="file"
              // accept="image/*"
              type="text"
              onChange={handleLogoUrlChange}
              placeholder="Drag and drop image or enter URL"
              required
            />
            {/* {logoUrl && (
                <div>
                <h2>Preview:</h2>
                <img src={logoUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </div>
            )} */}
          </div>
        </label>
        </div>
        <div className="form-row">
        <label className="form-label">
          Chain ID : <span className="required">*</span>
          <select className='form-input' value={chainId} onChange={handleChainIdChange} required>
            <option value="" disabled>Select Chain</option>
            <option value="1">Ethereum</option>
            <option value="2">BSC</option>
          </select>
        </label>
        </div>
        <div className="form-row">
            <p><b>Contact Naz on discord if desired chain is not listed.</b></p>
        </div>
        <div className="form-row">
        <label className='form-label'>
          Project Telegram URL :
          <input
            className='form-input'
            type="url"
            value={telegramUrl}
            onChange={handleTelegramUrlChange}
            placeholder="Enter Telegram URL"
          />
        </label>
        </div>
        <div className='form-row'>
        <label className='form-label'>
          Project Twitter URL :
          <input
            className='form-input'
            type="url"
            value={twitterUrl}
            onChange={handleTwitterUrlChange}
            placeholder="Enter Twitter URL"
          />
        </label>
        </div>
        <div className='form-row'>
        <label className='form-label'>
          Project Website URL :
          <input
            className='form-input'
            type="url"
            value={websiteUrl}
            onChange={handleWebsiteUrlChange}
            placeholder="Enter Website URL"
            
          />
        </label>
        </div>
        <div className='form-row'>
        <label className='form-label'>
          Project Whitepaper URL :
          <input
            className='form-input'
            type="url"
            value={whitepaperUrl}
            onChange={handleWhitepaperUrlChange}
            placeholder="Enter Whitepaper URL"         
          />
        </label>
        </div>
        <div className='form-row'>
        <label className='form-label'>
          Project Discord URL :
          <input
            className='form-input'
            type="url"
            value={discordUrl}
            onChange={handleDiscordUrlChange}
            placeholder="Enter Discord URL"      
          />
        </label>
        </div>
        <div className='form-row'>
        <label className='form-label'>
        <span className="required">*</span>
        Desired Start Time : &nbsp;
          <input 
            type="datetime-local" 
            value={startTime}
            onChange={handleStartTimeChange}
          />
        </label>
        </div>
        <div className='form-row'>
        If you're having any issues, please see this&nbsp;<a href="https://safelaunch.io"> video</a> &nbsp;on how to fix them.
        </div>
        
        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  </div>
  );
}

export default CreateDealForm;
