import React, { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import styles from "../styles/main.module.css"
import Navbar from '../components/Navbar'
import HeroSection from "../components/HeroSection"
import * as web3 from "@solana/web3.js";
import {Connection,clusterApiUrl,PublicKey, Transaction, SystemProgram,
  LAMPORTS_PER_SOL} from "@solana/web3.js"

import * as nacl from "tweetnacl";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

export default function Home() {

  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState();
  const [balance, setBalance] = useState();
  const [burnTokenBalance, setBurnTokenBalance] = useState();
  const [burnLoading, setBurnLoading] = useState(false)

    var connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  );
  const burnAddress = new PublicKey("5kbB2Q8mdwobZY4yXLvC3nNZfZ6xFvgUzRR4w7sGsGcp");
  

  const connectWallet = async () => {
    try {
      // const { solana } = window;
      console.log('solana', solana)
      if (solana) {
        const account = await solana.connect();
        console.log(account)
         setWalletConnected(true);
        console.log('Connected with Public Key:', account.publicKey.toString());
        const address = await account?.publicKey
         setWalletAddress(address);
        await connection.getBalance(address).then(async (value) => {
          const walletBalance = value / 10**9
          console.log(walletBalance);
          setBalance(walletBalance)
        })
        console.log('balance', balance)
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getBurnTokenBalance = async() => {

    connection.getBalance(burnAddress).then(function (value) {
      document.getElementById('burnToken').innerHTML = value / 10**9 + " SOL";
      setBurnTokenBalance(value/10**9)
   });

   }

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
      setBurnLoading(true)
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
          connectWallet()
          setBurnLoading(false);
        console.log("SIGNATURE", signature, confirmed);
    } catch (error) {
        console.log('error', `Transaction failed! ${error?.message}`, signature);
        return;
    }   

}

useEffect(()=>{
  getBurnTokenBalance();
})

  return (
    
    <main>
      <Navbar connectWallet={connectWallet} walletConnected={walletConnected} balance={balance}/>
      <HeroSection burnToken={burnToken} burnTokenBalance={burnTokenBalance} burnLoading={burnLoading}/>
    </main>
  )
}
