import { Navbar } from "../component/nav/Navbar";
import Main from "./component/Main";
import React from "react";

const SigninPage = () => {
  return (
    // 1. h-screen: Fixes height to window size so internal scroll works
    // 2. flex flex-col: Stacks Navbar and Main vertically
    // 3. overflow-hidden: Prevents window scrollbars
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-none">
        <Navbar />
      </div>
      
      {/* flex-1: Forces this container to take whatever height is left */}
      <div className="flex-1 relative">
        <Main />
      </div>
    </div>
  );
};

export default SigninPage;