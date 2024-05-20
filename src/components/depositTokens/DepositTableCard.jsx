//working fine Sahil
import React, { useState } from 'react';
import Web3 from 'web3';
import DepositTable from './DepositTable';
import { abi, contractAddress } from '../contractInfo'; // import your contract ABI and address

const DepositTableCard = ({ data }) => {
  const [distributionId, setDistributionId] = useState('');
  const [amount, setAmount] = useState('');
  const [unlockTime, setUnlockTime] = useState('');

  

  const handleDeposit = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(abi, contractAddress);

      const accounts = await web3.eth.getAccounts();
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const unlockTimeInSeconds = Math.floor(new Date(unlockTime).getTime() / 1000); // Convert unlock time to seconds

      if (unlockTimeInSeconds <= currentTime && unlockTimeInSeconds !== 0) {
        alert('Unlock time must be in the future or zero');
        return;
      }

      await contract.methods.deposit(distributionId, web3.utils.toWei(amount, 'ether'), unlockTimeInSeconds).send({ from: accounts[0] });
      alert('Deposit successful');
    } catch (error) {
      console.error(error);
      alert('Error making deposit');
    }
  };

  return (
    <>


      <div className='w-full flex flex-col items-center'> {/* Center the content horizontally */}
        <h1 className='text-xl font-bold leading-6 pb-3 sm:pb-1'>Deposit</h1>
        <DepositTable tableData={data.tableData} />
        <p className='text-neutral-400 text-sm font-bold'>Total Deposited: {data.total} </p>

        {/* form to deposit */}
        <form className='flex flex-col gap-4 mt-6'>
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-8 items-center'> {/* Center the items horizontally */}


            <h2>Deposit Tokens</h2>
            <br />
            <div>
              <label>Distribution ID:</label>
              <input
                type="number"
                value={distributionId}
                onChange={(e) => setDistributionId(e.target.value)}
              />
            </div>
            <div>
              <label>Amount:</label>

              <input
                type="string"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label>Unlock Time:</label>
              <input
                type="datetime-local"
                value={unlockTime}
                onChange={(e) => setUnlockTime(e.target.value)}
              />
            </div>
          </div>
          <p>Date and times should be specified in your local timezone.</p>
          <button type='button' onClick={handleDeposit} className='mx-auto bg-neutral-200 text-neutral-400 cursor-pointer font-semibold p-2 rounded-md mb-16'>Deposit</button>
        </form>
      </div>
    </>
  );
};

export default DepositTableCard;

