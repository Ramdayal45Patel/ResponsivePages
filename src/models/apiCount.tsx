// import React, { createContext, useContext, useState, useMemo } from "react";

// // Create a context to hold the API call count
// const ApiCallCountContext = createContext<any>(0);

// // Custom hook to access the API call count and increment it
// export const useApiCallCount = () => useContext(ApiCallCountContext);

// // Provider component to manage the API call count state
// export const ApiCallCountProvider = ({ children, initialCount = 0 }:any) => {
//   const [apiCallCount, setApiCallCount] = useState(initialCount);

//   // Function to increment the API call count
//   const incrementApiCallCount = () => {
//     setApiCallCount((prevCount:any) => prevCount + 1);
//   };

//   const contextValue = useMemo(
//     () => ({ apiCallCount, incrementApiCallCount }),
//     [apiCallCount, incrementApiCallCount]
//   );

//   return (
//     <ApiCallCountContext.Provider value={contextValue}>
//       {children}
//     </ApiCallCountContext.Provider>
//   );
// };
