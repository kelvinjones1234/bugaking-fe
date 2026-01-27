// "use client";

// import React, { useState } from 'react';
// import Main from './components/Main';
// import InvestmentDetail from './components/InvestmentDetail';

// const PortfolioPage = () => {
//   const [isDetailView, setIsDetailView] = useState(false);

//   return (
//     <div className='md:pt-[4rem] lg:pt-0'>
//       {isDetailView ? (
//         <InvestmentDetail onBack={() => setIsDetailView(false)} />
//       ) : (
//         <Main onNavigateToDetail={() => setIsDetailView(true)} />
//       )}
//     </div>
//   );
// };

// export default PortfolioPage;




"use client";

import React, { useState } from 'react';
import Main from './components/Main';
import InvestmentDetail from './components/InvestmentDetail';

const PortfolioPage = () => {
  // Change state to hold the ID (number) or null (if showing the list)
  const [selectedInvestmentId, setSelectedInvestmentId] = useState<number | null>(null);

  return (
    <div className='md:pt-[4rem] lg:pt-0'>
      {selectedInvestmentId !== null ? (
        <InvestmentDetail 
          id={selectedInvestmentId} 
          onBack={() => setSelectedInvestmentId(null)} 
        />
      ) : (
        <Main 
          onNavigateToDetail={(id) => setSelectedInvestmentId(id)} 
        />
      )}
    </div>
  );
};

export default PortfolioPage;