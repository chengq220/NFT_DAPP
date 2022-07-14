import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import metamask from "../images/metamask.png";
import '../styles/App.css';
import contract from '../contracts/NewMintNet.json';
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

  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentBalance, setBalance] = useState(0);

  {/*Check if the wallet is installed*/}
    {/*const checkWalletIsConnected = async () => {
    const {ethereum} = window;*/}

    {/*If metamask is not installed, then the function is terminated*/}
      {/*if (!ethereum){
      console.log("Make sure you have Metamask installed");
      return;
    }*/}

    {/*Get the address of the wallet*/}
      {/*const accounts = await ethereum.request({method: 'eth_accounts'});*/}

    {/*Make sure that the accouns returned by the request is not empty*/}
    {/*if(accounts.length != 0){
      const account = accounts[0];
      console.log("Found an authorized account:", account);
    }else{
      console.log("No authorized account found");
    }
  }*/}

  {/*Connect the front-end page to the wallet*/}
  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      {/*Get the details of the accounts such as account address*/}
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);

      {/*Signing a message to make sure that the wallet is yours*/}
      let message = "hello world";
      let signature = await signer.signMessage(message);
      let recover_address = ethers.utils.verifyMessage(message,signature);

      {/*Make sure that the recovered address is the same as the walle address*/}
      if(recover_address = accounts[0]){
        setCurrentAccount(accounts[0]);
        console.log(provider);

        {/* Get the balance of the specific wallet */}
        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.utils.formatEther(balance.toString()));
        console.log(`The ${accounts[0]} balance: ${balance.toString()}`);
      }
      else{
        console.log("Accounts does not match");
        return;
      }

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

  {/*A function that's reponsible for transferring eth between two accounts*/}
  const transfer = (target,amount) =>{
    console.log(target.currentAccount);
    console.log(amount);
    if(currentBalance >= amount){
      const tx = signer.sendTransaction({
        to: target.currentAccount,
        value: ethers.utils.parseEther(amount.toString())
      });
    }
  }


  const getURI = () =>{
    {/*Check to make sure that the the address owns at least 1 token*/}
    let numOwned = 0;
    nftContract.mintedWallet(currentAccount).then(data=>{numOwned = data});
    if(numOwned = 0){
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

  {/*A funciton that returns the html for the instance when wallet is not connected*/}
  {/*const connectWalletButton = () => {
    return (
      <>
        <div className = "accountstyle">Not currently connected</div>
        <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
          Connect Wallet
        </button>
      </>
    );
  } */}

  {/*A funciton that returns the html for the instance when wallet is connected*/}
  const afterLogin = () => {
    return (
      <>
        <div className = "accountstyle">
          <div>Connected to: {currentAccount}</div>
          <div>Balance: {currentBalance} ETH</div>
        </div>
        <button onClick={mintNftHandler} className='cta-button mint-nft-button'>Mint NFT</button>
        <div></div>
        <button onClick={(event) => transfer({currentAccount}, 0.01)} className='cta-button mint-nft-button'>Transfer</button>
        <div></div>
        <button onClick={getURI} className='cta-button mint-nft-button'>Get URI</button>
        <div></div>
        <button onClick={numOwned} className='cta-button mint-nft-button'>Owned NFT</button>
      </>
    )
  }

  const login = () => {
    return (
      <>
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              />
            </div>
            <p className="forgot-password text-right mt-2">
            <a style = {{textDecoration:'none'}}href="#"> Forgot Password?</a>
            </p>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
              <h6>Login</h6>
              </button>
            </div>
            </div>
            <hr></hr>
            <div className = "option">
              <img style = {{width:"3vw"}} src = {metamask} alt = "Meta Mask" />
              <span onClick = {connectWalletHandler}>Continue With Wallet</span>
            </div>
          </form>
        </div>
      </>
    )
  }


  {/*Check to see if the wallet is connected after rendering*/}
    {/*useEffect(() => {
    checkWalletIsConnected();
  });*/}

  return (
    <div className='main-app'>
      <div>
        {currentAccount ? afterLogin() : login()}
      </div>
    </div>
  )
}

export default App;
