// import React from "react";
// import Main from "./component/Main";
// import { Navbar } from "../component/nav/Navbar";

// const SignupPage = () => {
//   return (
//     <div>
//       <Navbar />
//       <Main />
//     </div>
//   );
// };

// export default SignupPage;







import React from "react";
import Main from "./component/Main";
import { Navbar } from "../component/nav/Navbar";

const SignupPage = () => {
  return (
    // 1. h-screen: Fix height to window size
    // 2. flex-col: Stack Navbar and Main
    // 3. overflow-hidden: No window scrollbars
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-none">
        <Navbar />
      </div>
      
      {/* flex-1: Fills the remaining vertical space */}
      <div className="flex-1 relative">
        <Main />
      </div>
    </div>
  );
};

export default SignupPage;