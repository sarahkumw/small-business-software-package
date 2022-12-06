import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function RegisterPage({ users }){
  const history = useHistory();
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const handleEmailChange = (event) => {setEmail(event.target.value)};
  const handlePasswordChange = (event) => {setPassword(event.target.value)};
  const handleCpasswordChange = (event) => {setCpassword(event.target.value)};

  const handleRegister = () => {
      if(password === cpassword){
          users.push({"email": email, "password": password, "messages": [{
            "subject": "Welcome!",
            "message": "Thank you for joining."
          }]})
          setError(false);
          console.log("users are", users)
          history.push("/login")
      }
      else{
          setError(true)
      }
      
  }
  
  return(
    <div className="outside">
      <div className="login-box">
        <h1>Create Account</h1>
        <form>
          <section>
            <div>
              <label htmlFor="email">Email</label>
                <input 
                  type="text"
                  id="email" 
                  value={email} 
                  name="email" 
                  onChange={handleEmailChange} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input 
                type="text" 
                id="password" 
                value={password} 
                name="password" 
                onChange={handlePasswordChange} />
            </div>
            <div>
              <label htmlFor="cpassword">Confirm Password</label>
              <input 
                type="text" 
                id="cpassword" 
                value={cpassword} 
                name="cpassword" 
                onChange={handleCpasswordChange} />
            </div>
          </section>
        </form>
        {error ? <div className="alert alert-danger m-2">Passwords must match</div> : null}
        <button onClick={handleRegister} style={{marginTop:"30px"}}>Register</button>
      </div>
    </div>
  )
}


export default RegisterPage;