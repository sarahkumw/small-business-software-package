import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";


function LogInPage({ handleLoggedInClick, users, setUser }){
  const history = useHistory();
  const [error, setError] = useState(false);
  const handleLogIn = () => {
    if(users.find(e => e.email === email && e.password === password)){
      const currentUser = users.find((u) => u.email === email)
      setUser(currentUser)
      handleLoggedInClick();
      console.log("logged in user is ", currentUser)
      history.push("/");
    }
    else{
      setError(true)
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    setError(false)
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    setError(false)
  };
  
  return(
    <div className="outside">
      <div className="login-box">
        <h1>Log In</h1>
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
          </section>
        </form>
        <Link to="/forgotpassword">Forgot Password?</Link>
        {error ? <div className="alert alert-danger m-2">Email/Password not found.</div> : null}
        <button onClick={handleLogIn} style={{marginTop:"30px"}}>Log In</button>
      </div>
    </div>
  )
}


export default LogInPage;