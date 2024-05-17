// // MetamaskContext.js
// import React, { createContext, useState, useEffect } from 'react';

// export const MetamaskContext = createContext();

// export const MetamaskProvider = ({ children }) => {
//   const [account, setAccount] = useState(localStorage.getItem('metamaskAccount') || null);

//   useEffect(() => {
//     if (account) {
//       localStorage.setItem('metamaskAccount', account);
//     } else {
//       localStorage.removeItem('metamaskAccount');
//     }
//   }, [account]);

//   const connectMetamask = async () => {
//     if (!window.ethereum) {
//       console.log("Install Metamask");
//       return;
//     }
//     try {
//       const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//       setAccount(accounts[0]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <MetamaskContext.Provider value={{ account, connectMetamask }}>
//       {children}
//     </MetamaskContext.Provider>
//   );
// };

// // MetamaskContext.js
// import React, { createContext, useState, useEffect } from 'react';

// export const MetamaskContext = createContext();

// export const MetamaskProvider = ({ children }) => {
//   const [account, setAccount] = useState(null); // Initialize account explicitly as null

//   useEffect(() => {
//     const storedAccount = localStorage.getItem('metamaskAccount');
//     if (storedAccount) {
//       setAccount(storedAccount);
//     }
//   }, []); // Run only on component mount to check stored account

//   useEffect(() => {
//     if (account) {
//       localStorage.setItem('metamaskAccount', account);
//     } else {
//       localStorage.removeItem('metamaskAccount');
//     }
//   }, [account]);

//   const connectMetamask = async () => {
//     if (!window.ethereum) {
//       console.log("Install Metamask");
//       return;
//     }
//     try {
//       const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//       setAccount(accounts[0]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <MetamaskContext.Provider value={{ account, connectMetamask }}>
//       {children}
//     </MetamaskContext.Provider>
//   );
// };


// MetamaskContext.js
// import React, { createContext, useState, useEffect } from 'react';

// export const MetamaskContext = createContext();

// export const MetamaskProvider = ({ children }) => {
//   const [account, setAccount] = useState(null);

//   useEffect(() => {
//     connectMetamask(); // Call connectMetamask function when component mounts
//   }, []); // Empty dependency array ensures this effect runs only once on mount

//   const connectMetamask = async () => {
//     if (!window.ethereum) {
//       console.log("Install Metamask");
//       return;
//     }
//     try {
//       const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//       setAccount(accounts[0]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <MetamaskContext.Provider value={{ account, connectMetamask }}>
//       {children}
//     </MetamaskContext.Provider>
//   );
// };
// import React, { createContext, useState, useEffect } from 'react';

// export const MetamaskContext = createContext();

// export const MetamaskProvider = ({ children }) => {
//   const [account, setAccount] = useState(null);

//   useEffect(() => {
//     const connectMetamask = async () => {
//       if (!window.ethereum) {
//         console.log("Install Metamask");
//         return;
//       }
//       try {
//         const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//         setAccount(accounts[0]);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     connectMetamask(); // Call connectMetamask function when component mounts
//   }, []); // Empty dependency array ensures this effect runs only once on mount

//   return (
//     <MetamaskContext.Provider value={{ account }}>
//       {children}
//     </MetamaskContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from 'react';

export const MetamaskContext = createContext();

export const MetamaskProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  const connectMetamask = async () => {
    if (!window.ethereum) {
      console.log("Install Metamask");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (!window.ethereum) {
        console.log("Install Metamask");
        return;
      }

      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          console.log("No accounts found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Check if already connected on mount
    checkIfWalletIsConnected();

    // Listen for account changes
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(null);
      }
    });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <MetamaskContext.Provider value={{ account, connectMetamask }}>
      {children}
    </MetamaskContext.Provider>
  );
};
