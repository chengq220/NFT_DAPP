import React, { useState } from "react";
import {Card, Button, Alert} from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function Home(){

  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate()

  async function handleLogout(){
    setError('')

    try{
      await logout()
      navigate("/login")
    } catch{
      setError('Failed to log out')
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          {error && <Alert variant = "danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <div className = "accountstyle">
            <div>Connected to: </div>
            <div>Balance:  ETH</div>
          </div>
          <button className='cta-button mint-nft-button'>Mint NFT</button>
          <div></div>
          <button  className='cta-button mint-nft-button'>Transfer</button>
          <div></div>
          <button  className='cta-button mint-nft-button'>Get URI</button>
          <div></div>
          <button className='cta-button mint-nft-button'>Owned NFT</button>
        </Card.Body>
      </Card>
      <div className = "w-100 text-center mt-2">
        <Button variant = "link" onClick={handleLogout}>Log out</Button>
      </div>
    </>
  )
}
