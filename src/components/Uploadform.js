//working fine sahil
import React, { useState, useContext } from 'react';
import Headers from '../components/Header';
import Sidebar from './Sidebar';
import Web3 from 'web3';
import { abi, contractAddress } from './contractInfo';
import { MetamaskContext } from '../components/Metamask'; // Adjust the path according to your file structure

const UploadForm = () => {
  // const { account } = useContext(MetamaskContext); // Access account from MetamaskContext
  const { account, connectMetamask } = useContext(MetamaskContext);
  const [contributorsAndAmounts, setContributorsAndAmounts] = useState('');
  const [distributionName, setDistributionName] = useState('');
  const [distributionTokenAddress, setDistributionTokenAddress] = useState('');

  const handleUpload = async () => {
    try {
      

      const web3 = new Web3(window.ethereum);
      console.log('upload', account);
      const contract = new web3.eth.Contract(abi, contractAddress);

      const contributorsAndAmountsArray = contributorsAndAmounts.split(',').map(entry => entry.trim());
      const contributors = [];
      const amounts = [];
      for (let i = 0; i < contributorsAndAmountsArray.length; i += 2) {
        contributors.push(contributorsAndAmountsArray[i]);
        amounts.push(web3.utils.toWei(contributorsAndAmountsArray[i + 1], 'ether'));
      }

      const tx = await contract.methods.create(
        distributionName,
        distributionTokenAddress,
        contributors,
        amounts
      ).send({ from: account });

      console.log('Distribution created successfully!', tx);
    } catch (error) {
      console.error('Error creating distribution:', error);
    }
  };

  return (
    <div>
      <div>
        <Headers accounts={account}/>
      </div>
      <Sidebar/>
      <div style={{ display: 'inline-block' }}>
        <h2>Paste Contributors and Amounts</h2>
        <textarea
          value={contributorsAndAmounts}
          onChange={(e) => setContributorsAndAmounts(e.target.value)}
          placeholder="Enter contributors and their amounts separated by ','"
          rows={8}
          cols={80}
          className="border border-gray-800 rounded-md p-2"
        />
      </div>
      <div style={{ display: 'inline-block', marginLeft: '50px' }}>
        <h2>Distribution Details</h2>
        <div>
          <label style={{ marginRight: '10px' }}>Name</label>
          <br/>
          <input
            type="text"
            value={distributionName}
            onChange={(e) => setDistributionName(e.target.value)}
            className="border border-gray-800 rounded-md p-2"
          />
        </div>
       
        <div>
          <label style={{ marginRight: '10px' }}>Token Address</label>
          <br/>
          <input
            type="text"
            value={distributionTokenAddress}
            onChange={(e) => setDistributionTokenAddress(e.target.value)}
            className="border border-gray-800 rounded-md p-2"
          />
        </div>
        <button onClick={handleUpload} className="border border-gray-800 rounded-md p-2 mt-2 bg-blue-500 text-white hover:bg-blue-600">
          Create
        </button>
      </div>
    </div>
  );
};

export default UploadForm;
