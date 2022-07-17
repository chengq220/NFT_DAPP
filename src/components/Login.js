import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import metamask from "../images/metamask.png"
import { ethers } from 'ethers';
import "../styles/styles.css"


export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, walletLogin } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate("/home")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  async function cryptoWalletLogin(){
    try{
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);

      let message = "Authenticate Your Account";
      let signature = await signer.signMessage(message);
      let recover_address = ethers.utils.verifyMessage(message,signature);
      if(accounts[0] !== recover_address){
        setError("Failed to log in");
        return;
      }
      await walletLogin(accounts[0])
      navigate("/home")
    } catch{
      setError("Failed to log in")
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <br></br>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
            <div className="mt-3 text-center w-100">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Form>
          <hr></hr>
          <div className = "option">
            <img style = {{width:"3vw"}} src = {metamask} alt = "Meta Mask" />
            <span onClick = {cryptoWalletLogin}>Continue With Wallet</span>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}