import React, { useEffect } from "react";
import { useWallet } from "@mintbase-js/react";

const Header = () => {
  const {
    connect,
    disconnect,
    activeAccountId,
    selector,
    isConnected,
    errorMessage,
  } = useWallet();
  useEffect(() => {
    console.log(isConnected);
  }, []);
  return (
    <nav className="w-full h-14 flex items-center justify-between px-7 bg-white">
      {isConnected ? (
        <div className="flex items-center justify-between w-full">
          <div className="text-black ">
            You are connected as {activeAccountId}
          </div>
          <button
            onClick={disconnect}
            className="text-black bg-blue-400 px-7 py-2"
          >
            Logout
          </button>
        </div>
      ) : (
        <button onClick={connect} className="text-black bg-green-400 px-7 py-2">
          Login
        </button>
      )}
    </nav>
  );
};

export default Header;
