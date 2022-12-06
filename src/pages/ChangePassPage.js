import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function ChangePass({ user }){
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState(false)
  const handlePasswordChange = (event) => {setPassword(event.target.value)};
  const handleCpasswordChange = (event) => {setCpassword(event.target.value)};
  const handlePassChange = () => {
    if(password === cpassword){
      user.password = password;
      const updateMessage = {
        "subject": "Confirm Password Update",
        "message": "You have successfully updated your password.  If you did not make this change, plase contact support immediately."
      };
      const messages = user.messages;
      messages.push(updateMessage);
      setError(false);
      console.log("new password is", user)
      history.push("/login")
    }
    else{
      setError(true)
    }
  }
  
  return(
    <div className="outside">
      <div className="login-box">
        <h1>Change Password</h1>
        <h5>Email: {user.email}</h5>
        <form style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
          <section>
            <div>
              <label htmlFor="password">Password</label>
              <input 
                  type="text" 
                  id="password" 
                  value={password} 
                  name="password" 
                  onChange={handlePasswordChange}/>
            </div>
            <div>
              <label htmlFor="cpassword">Confirm Password</label>
              <input 
                  type="text" 
                  id="cpassword" 
                  value={cpassword} 
                  name="cpassword" 
                  onChange={handleCpasswordChange}/>
            </div>
          </section>
        </form>
        {error ? <div style={{color:"red"}}>Passwords must match</div> : null}
        <button onClick={handlePassChange} style={{marginTop:"30px"}}>Change Password</button>
      </div>
    </div>
  )
}


export default ChangePass;