import React, { useEffect, useState } from "react";
import './App.css';
import contract from './contracts/NewMintNet.json';
import { ethers } from 'ethers';

{/*The essential information of the smart contract that the dApp is connecting to*/}
{/*const contractAddress = "0x8DE24c0a1eD2C07b6EeBBC2f97697eec5bE1C34C";*/}
const contractAddress = "0xb15275bE4573AFB78f084b97682BB68dd33084d6";
const abi = contract.abi;

{/* Instantiate the information that we need to connect with the wallet and contract */}
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const nftContract = new ethers.Contract(contractAddress, abi, signer);

function App(){
  {/*Variables that we want to keep track of*/}
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentBalance, setBalance] = useState(0);

  {/*Check if the wallet is installed*/}
  const checkWalletIsConnected = async () => {
    const {ethereum} = window;

    {/*If metamask is not installed, then the function is terminated*/}
    if (!ethereum){
      console.log("Make sure you have Metamask installed");
      return;
    }

    {/*Get the address of the wallet*/}
    const accounts = await ethereum.request({method: 'eth_accounts'});

    {/*Make sure that the accouns returned by the request is not empty*/}
    if(accounts.length != 0){
      const account = accounts[0];
      console.log("Found an authorized account:", account);
    }else{
      console.log("No authorized account found");
    }
  }

  {/*Connect the front-end page to the wallet*/}
  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      {/*Connect to the account*/}
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);

      console.log(provider);

      {/* Get the balance of the specific wallet */}
      const balance = await provider.getBalance(accounts[0]);
      setBalance(ethers.utils.formatEther(balance.toString()));
      console.log(`The ${accounts[0]} balance: ${balance.toString()}`);

    } catch (err) {
      console.log(err)
    }
  }

  {/*Function that initialie a mint event in the smart contract*/}
  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        console.log("Initialize payment");

        {/*Calls the mint function in the smart contract*/}
        let nftTxn = await nftContract.mint({ value: ethers.utils.parseEther("0.05") });

        console.log("Mining... please wait");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  {/*A funciton that returns the html for the instance when wallet is not connected*/}
  const connectWalletButton = () => {
    return (
      <>
        <div className = "accountstyle">Not currently connected</div>
        <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
          Connect Wallet
        </button>
      </>
    );
  }

  const getURI = () =>{
    {/*Check to make sure that the the address owns at least 1 token*/}
    let numOwned = 0;
    nftContract.mintedWallet(currentAccount).then(data=>{numOwned = data});
    if(numOwned <= 0){
      console.log("You don't own any tokens!");
      return;
    }
    {/*Change it so that it takes the tokenURI of the token owned by the address --> need to implementa  funciton in solidity*/}
    {/*Get the URI of the smart contract and update the state*/}
    nftContract.tokenURI(1).then(data=>{console.log(data.toString())});
  }

  const numOwned = () => {
    {/*Get number of token that the address own in this smart contract*/}
    nftContract.mintedWallet(currentAccount).then(data=>{console.log("Number of token you own is " + data.toString())});
  }

  {/*A funciton that returns the html for the instance when wallet is connected*/}
  const mintNftButton = () => {
    return (
      <>
        <div className = "accountstyle">
          <div>Connected to: {currentAccount}</div>
          <div>Balance: {currentBalance} ETH</div>
        </div>
        <button onClick={mintNftHandler} className='cta-button mint-nft-button'>Mint NFT</button>
        <div></div>
        <button onClick={getURI} className='cta-button mint-nft-button'>Get URI</button>
        <div></div>
        <button onClick={numOwned} className='cta-button mint-nft-button'>Owned NFT</button>
      </>
    )
  }


  {/*Check to see if the wallet is connected after rendering*/}
  useEffect(() => {
    checkWalletIsConnected();
  });

  return (
    <div className='main-app'>
      <h1>Stick Figure NFT</h1>
      <div>
        {currentAccount ? mintNftButton() : connectWalletButton()}
      </div>
    </div>
  )
}

export default App;
