import React,{useState,useEffect} from 'react'
import DepositTableCard from '../components/depositTokens/DepositTableCard'
import DistributionCard from '../components/depositTokens/DistributionCard'
import Sidebar from '../components/Sidebar';
import Head from '../components/Head';
import Header from '../components/Header';
import supabase from "../config/supabaseClient";
import Headers from '../components/Header';


const DepositTokens = ({ accounts }) => {
    const [selectedDistribution, setSelectedDistribution] = useState(null);
    const [distributorOptions, setDistributorOptions] = useState([]);
    const [cardData, setCardData] = useState(['Please select the drop down']);

    const handleDistributionChange = (event) => {
        //setSelectedDistribution(event.target.value);
        const selectedOption = event.target.value;
        setSelectedDistribution(selectedOption);


        const selectedDistributor = distributorOptions.find(option => option.project_name === selectedOption);
        if (selectedDistributor) {
            // Update cardData based on the selected distributor
            setCardData({
                title: selectedDistributor.project_name,
                distributionId: selectedDistributor.id,
                id: selectedDistributor.contract_address,
                fundraiseAmount: 10,
                NumTokensWithdrawn: 10,
                createdBy: selectedDistributor.project_owner,
                totalContributors: 10
            });
        }
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
          console.log("DataBase", data);
          setDistributorOptions(data);
        } catch (error) {
          console.error('Error fetching distributor options:', error.message);
        }
      };
    

    const depositData={
        total:666666,
        tableData:[
            {
                time:'Apr 8,2024 @ 2:15 PM',
                amount:66666,
                depossitId:0,
            },
            {
                time:'Apr 8,2024 @ 2:15 PM',
                amount:66666,
                depossitId:0,
            },
            {
                time:'Apr 8,2024 @ 2:15 PM',
                amount:66666,
                depossitId:0,
            },
            {
                time:'Apr 8,2024 @ 2:15 PM',
                amount:66666,
                depossitId:0,
            },
            {
                time:'Apr 8,2024 @ 2:15 PM',
                amount:66666,
                depossitId:0,
            },
        ]
    }
//I have added dummy data but this data will come from apis. and then we can pass it down as props.
  return (
    <div>
      <div>
        <Headers  accounts={accounts}/>
        {/* <Head /> */}
      </div>
      <Sidebar/>
    {/* <Header/> */}
    <div className='space-y-3'>
        <h1 className='font-bold text-3xl pt-2 sm:pt-0'>Distribute Tokens</h1>
        <div className='pb-3'>
            {/* <SelectInput label={'Select Distribution'} value ={selectedDistribution} /> */}
            <div>Select Distributor</div>
            <select className='select border border-gray-500 w-80' value={selectedDistribution} onChange={handleDistributionChange}>
            <option value="">Select...</option>
            {distributorOptions.map((projects) => (
                <option key={projects.id} value={projects.project_name}>{projects.project_name}</option>
                
                ))}
            </select>
            
        </div>
        <DistributionCard data={cardData}/>
        <DepositTableCard data={depositData}/>
    </div>
    </div>
  )
}

export default DepositTokens