// import React from 'react'
// import { TextInput } from '../UI/Inputs/TextInput'
// import DepositTable from './DepositTable'

// const DepositTableCard = ({data}) => {
//   return (
//     <div className='w-full'>
//         <h1 className='text-xl font-bold leading-6 pb-3 sm:pb-1'>Deposit</h1>
//         <DepositTable tableData={data.tableData}/>
//         <p className='text-neutral-400 text-sm font-bold'>Total Deposited: {data.total} </p>

//         {/* form to deposit  */}

//         <form className='flex flex-col gap-4 mt-6' >
//             <div className='flex flex-col sm:flex-row gap-4 sm:gap-8'>
//             <TextInput label={'Amount'} name="amount" type={'text'} />
//             <TextInput label={'Unlock Date & Time'} name="unlockdandt" type={'datetime-local'} />
//             </div>
//             <p>Date and times should be specified in your local timezone.</p>
//             <button type='submit' disabled={false} className='mx-auto bg-neutral-200 text-neutral-400 cursor-pointer font-semibold p-2 rounded-md mb-16'>Deposit</button>
//         </form>
//     </div>
//   )
// }

// export default DepositTableCard

////new code integration of remove token

import React, { useState } from 'react';
import { TextInput } from '../UI/Inputs/TextInput';
import DepositTable from './DepositTable';
import Web3 from 'web3';

const DepositTableCard = ({ data }) => {
  const [amount, setAmount] = useState('');
  const [unlockTime, setUnlockTime] = useState('');

  // Add the deposit function
  const handleDeposit = async () => {
    try {
      // Ensure MetaMask or another wallet is connected
      if (!window.ethereum) {
        alert('Please install MetaMask');
        return;
      }

      const web3 = new Web3(window.ethereum);

      // Contract details
      const contractAddress = '0xYourContractAddress'; // Replace with your contract address
      const contractABI = [
        // Replace with the ABI of your contract
        {
          "constant": false,
          "inputs": [
            {
              "name": "_distributionId",
              "type": "uint256"
            },
            {
              "name": "_amount",
              "type": "uint256"
            },
            {
              "name": "_unlockTime",
              "type": "uint256"
            }
          ],
          "name": "deposit",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      // Convert amount and unlockTime to the required formats
      const distributionId = 0; // Replace with the actual distribution ID you want to use
      const parsedAmount = web3.utils.toWei(amount, 'ether'); // Assuming ether
      const parsedUnlockTime = Math.floor(new Date(unlockTime).getTime() / 1000);

      // Make the deposit transaction
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      await contract.methods.deposit(distributionId, parsedAmount, parsedUnlockTime).send({ from: window.ethereum.selectedAddress });

      alert('Deposit successful');
    } catch (error) {
      console.error('Error depositing:', error);
      alert('Error depositing: ' + error.message);
    }
  };

  return (
    <div className='w-full'>
      <h1 className='text-xl font-bold leading-6 pb-3 sm:pb-1'>Deposit</h1>
      <DepositTable tableData={data.tableData} />
      <p className='text-neutral-400 text-sm font-bold'>Total Deposited: {data.total} </p>

      {/* form to deposit */}
      <form className='flex flex-col gap-4 mt-6' onSubmit={(e) => { e.preventDefault(); }}>
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-8'>
          <TextInput
            label={'Amount'}
            name="amount"
            type={'text'}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextInput
            label={'Unlock Date & Time'}
            name="unlockdandt"
            type={'datetime-local'}
            value={unlockTime}
            onChange={(e) => setUnlockTime(e.target.value)}
          />
        </div>
        <p>Date and times should be specified in your local timezone.</p>
        <button type='button' onClick={handleDeposit} className='mx-auto bg-neutral-200 text-neutral-400 cursor-pointer font-semibold p-2 rounded-md mb-16'>Deposit</button>
      </form>
    </div>
  );
};

export default DepositTableCard;
