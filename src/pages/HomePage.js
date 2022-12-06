import React from "react";
import { useHistory } from "react-router-dom";

function HomePage({ loggedIn, handleLoggedInClick, user, setUser }){
    const history = useHistory();
    const logOut = () => {
        handleLoggedInClick();
        setUser(null);
    }
      
      if(loggedIn){
        return(
          <div className="outside" style={{flexDirection:"column", justifyContent:"start"}}>
            <nav>
                <button className="nav-linkx" onClick={()=> history.push("/calendar")}>Book Appointment</button>
                <button className="nav-linkx" onClick={()=> history.push("/contact")}>Contact Us</button>
                <button className="nav-linkx" onClick={logOut}>Log Out</button>
            </nav>
            <div className="inside">
              <h1>Dashboard</h1>
              <h2>{user.email} logged in</h2>
              <br />
              <p>
                Content Content Content Content Content Content Content 
                Content Content Content Content Content Content Content 
                Content Content Content Content Content Content Content 
                Content Content Content Content Content Content Content 
                Content Content Content Content Content Content Content 
              </p>
            </div>
          </div>
        )
      }
      else{
        return(
          <div className="outside" style={{flexDirection:"column", justifyContent:"start"}}>
            <nav>
                <button className="nav-linkx" onClick={()=> history.push("/login")}>Log In</button>
                <button className="nav-linkx" onClick={()=> history.push("/register")}>Register</button>
            </nav>
            <div style={{width:"90%", backgroundColor:"white", height:"100%", padding:"20px", borderRadius:"20px"}}>
              <h1>Home Page</h1>
              <br />
              <p>
                Content Content Content Content Content Content Content 
                Content Content Content Content Content Content Content 
                Content Content Content Content Content Content Content 
                Content Content Content Content Content Content Content 
                Content Content Content Content Content Content Content 
              </p>
            </div>
          </div>
        )
      }
}


export default HomePage;