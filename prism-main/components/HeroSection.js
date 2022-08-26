import React from 'react'
import {Connection,clusterApiUrl,PublicKey, Transaction, SystemProgram,
   LAMPORTS_PER_SOL} from "@solana/web3.js"
import * as web3 from "@solana/web3.js"
import * as nacl from "tweetnacl";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
function HeroSection() {
  const burnToken = async () => {

      const provider = window.solana;
      const sender = await provider.connect()
      console.log(sender.publicKey.toString());
      
      const receiver = new PublicKey("5kbB2Q8mdwobZY4yXLvC3nNZfZ6xFvgUzRR4w7sGsGcp");
      const sol = 0.1;
      const connection = new Connection(
        clusterApiUrl('devnet'),
        "confirmed"
      );
  
      let signature = '';
      try {
        // const transaction = new Transaction();
        console.log("sender.publicKey =>" , sender.publicKey.toString());
        const addr = sender.publicKey.toString()
        const senderAddress = new PublicKey(addr)
        const recentBlockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
        const transaction = new Transaction().add(
              SystemProgram.transfer({
                    fromPubkey: senderAddress, //publicKey,
                    toPubkey: receiver,
                    lamports: 1_000_000_000 * sol,
                    
                })
            );
            transaction.recentBlockhash = recentBlockhash;
            transaction.feePayer = senderAddress

            let sign = await window.solana.signTransaction(transaction);
            let signature = await connection.sendRawTransaction(sign.serialize());
            const confirmed = await connection.confirmTransaction(signature);
          
          console.log("SIGNATURE", signature);
      } catch (error) {
          console.log('error', `Transaction failed! ${error?.message}`, signature);
          return;
      }   
  
  }
  

return (
<div class="relative bg-white overflow-hidden">
  <div class="max-w-7xl mx-auto">
    <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
      <svg class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" 
      fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="50,0 100,0 50,100 0,100" />
      </svg>

      <div>
        <div class="relative pt-6 px-4 sm:px-6 lg:px-8">
          <nav class="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
            <div class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
              <div class="flex items-center justify-between w-full md:w-auto">
                <a href="#">
                  <span class="sr-only">Workflow</span>
                </a>
                <div class="-mr-2 flex items-center md:hidden">
                  <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center 
                  text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset 
                  focus:ring-indigo-500" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div class="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
        </div>
      </div>

      <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div class="sm:text-center lg:text-left">
          <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block xl:inline">Burn Your</span>
            <span class="block text-indigo-600 xl:inline"> Token</span>
          </h1>
          <p id='showBalance' class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Total Tokens Burn = 1.2 SOL 
            </p>
          <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div class="rounded-md shadow">
              <button class="w-full flex items-center justify-center px-8 py-3 border border-transparent 
              text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              id="burnToken" onClick={burnToken}>
                Burn Tokens</button>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-3">
              <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">Know More</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
    <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt=""/>
  </div>
</div>
  )
}

export default HeroSection