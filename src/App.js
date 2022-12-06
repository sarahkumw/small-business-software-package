import HomePage from "./pages/HomePage";
import './App.css';
import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPass from "./pages/ForgotPassPage";
import ChangePass from "./pages/ChangePassPage";
import Calendar from "./pages/Calendar";
import ContactUs from "./pages/ContactUs";
import users from "./data/users";

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const toggleLoggedIn = () => setLoggedIn(!loggedIn);
  return(
    <div>
      <div style={{backgroundColor:"lightblue", marginBottom: "-20px"}}>
        <h3 id="logo" onClick={()=> history.push("/")}>Company Logo</h3>
      </div>
      <Switch>
        <Route exact={true} path="/">
          <HomePage loggedIn={loggedIn} handleLoggedInClick={toggleLoggedIn} user={user} setUser={setUser}/>
        </Route>
        <Route path="/login">
          <LogInPage users={users} user={user} setUser={setUser} handleLoggedInClick={toggleLoggedIn} />
        </Route>
        <Route path="/register">
          <RegisterPage users={users} />
        </Route>
        <Route path="/forgotpassword">
          <ForgotPass users={users} setUser={setUser} />
        </Route>
        <Route path="/changepassword">
          <ChangePass user={user} users={users} />
        </Route>
        <Route path="/calendar">
          <Calendar user={user} loggedIn={loggedIn}/>
        </Route>
        <Route path="/contact">
          <ContactUs user={user} loggedIn={loggedIn}/>
        </Route>
      </Switch>
    </div>
  );
  
}

export default App;
