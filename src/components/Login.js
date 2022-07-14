import React from "react";

export default function Login(props){
  console.log(props.connectWalletHandler);
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
            <span onClick = {() => console.log("im clicked")}>Continue With Wallet</span>
          </div>
        </form>
      </div>
    </>
  )
}
