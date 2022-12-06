import React, { useState } from "react";
import { useHistory } from "react-router-dom";


function ForgotPass({ users, setUser }){
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    setError(false)
  };
  const handleConfirm = () => {
    if(users.find(e => e.email === email)){
      const currentUser = users.find((u) => u.email === email)
      console.log("Email Sent to", currentUser.email);
      setUser(currentUser);
      history.push("/changepassword");
    }
    else{
      setError(true)
    }
  }
  return(
    <div className="outside">
      <div className="login-box">
        <h1 style={{marginBottom:"15px"}}>Forgot Password</h1>
        <h6>Enter your account email to receive a link to reset password</h6>
        <form style={{marginTop:"15px"}}>
          <section>
            <label htmlFor="email">Email</label>
            <input 
              type="text"
              id="email" 
              value={email} 
              name="email" 
              onChange={handleEmailChange} />
          </section>
        </form>
        {error ? <div className="alert alert-danger m-2">Email not found.</div> : null}
        <button onClick={handleConfirm} style={{marginTop:"30px"}}>Confirm</button>
      </div>
    </div>
  )
}



export default ForgotPass;