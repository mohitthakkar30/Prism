import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/navbar.module.css";
import * as web3 from "@solana/web3.js";

function Navbar({connectWallet, walletConnected, balance}) {
  console.log('balance',balance)
  useEffect(() => {

  }, [connectWallet]);

  return (
    <nav class="flex items-center justify-between flex-wrap p-6">
      <div class="flex items-center flex-shrink-0 text-indigo-600 mr-6">
        <svg
          class="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <span class="font-bold text-2xl tracking-tight text-indigo-600">
          Spectrum
        </span>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-indigo-600 mr-20 text-xl ml-96 hover:underline underline-offset-2 font-semibold"
          >
            Home
          </a>
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-indigo-600  mr-20 text-xl hover:underline underline-offset-2 font-semibold"
          >
            Pricing
          </a>
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-indigo-600 mr-20 text-xl hover:underline underline-offset-2 font-semibold"
          >
            About Us
          </a>
        </div>
        <div>
          <button
            onClick={connectWallet}
            class="inline-block px-4 py-2 leading-none border rounded text-white border-indigo-600 hover:border-transparent hover:text-white hover:bg-indigo-700 bg-indigo-600 mt-4 lg:mt-0 underline-offset-2 text-2xl"
            id="btnConnect"
          >
           { walletConnected ? `${balance} SOL` : "Connect Wallet"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
