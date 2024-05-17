// import React from 'react'

// const DepositTable = ({tableData}) => {
//   return (
//     <div className='overflow-x-auto sm:overflow-x-hidden'>

//    <table className='w-full min-w-[27rem] overflow-auto sm:overflow-hidden'>
//     <tr className='border-b border-b-neutral-200 text-base font-bold text-left'>
//         <th className='sm:w-1/2'>Unlock time</th>
//         <th>Amount</th>
//         <th>Deposit id</th>
//         <th>Undo</th>
//     </tr>
//     <tbody>
//         {
//             tableData?.map((data,i)=>(
//         <tr key={i} className='border-b border-b-neutral-200 text-sm'>
//             <td>Apr 8,2024 @ 2:15 PM</td>
//             <td>666666</td>
//             <td>0</td>
//             <td>
//                 <button className='border border-danger text-danger  p-1 my-1 font-bold text-sm rounded-md'>Remove Tokens</button>
//             </td>
//         </tr>

//             ))
//         }
//     </tbody>
//    </table>
//     </div>
//   )
// }

// export default DepositTable

//new code integration of remove token
import React from 'react';
import { ethers } from 'ethers';
import TokenDistributorABI from './TokenDistributorABI.json'; // Import the ABI of the smart contract

const DepositTable = ({ tableData, provider, signer }) => {
  const contractAddress = 'YOUR_SMART_CONTRACT_ADDRESS'; // Replace with your smart contract address

  const handleRemoveTokens = async (distributionId, depositIndex) => {
    try {
      const contract = new ethers.Contract(contractAddress, TokenDistributorABI, signer);
      const tx = await contract.undoDeposit(distributionId, depositIndex);
      await tx.wait();
      console.log(`Tokens removed for deposit index ${depositIndex} in distribution ${distributionId}`);
    } catch (error) {
      console.error('Error removing tokens:', error);
    }
  };

  return (
    <div className='overflow-x-auto sm:overflow-x-hidden'>
      <table className='w-full min-w-[27rem] overflow-auto sm:overflow-hidden'>
        <thead>
          <tr className='border-b border-b-neutral-200 text-base font-bold text-left'>
            <th className='sm:w-1/2'>Unlock time</th>
            <th>Amount</th>
            <th>Deposit id</th>
            <th>Undo</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((data, i) => (
            <tr key={i} className='border-b border-b-neutral-200 text-sm'>
              <td>{data.unlockTime}</td>
              <td>{data.amount}</td>
              <td>{data.depositId}</td>
              <td>
                <button
                  onClick={() => handleRemoveTokens(data.distributionId, data.depositId)}
                  className='border border-danger text-danger p-1 my-1 font-bold text-sm rounded-md'
                >
                  Remove Tokens
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepositTable;
