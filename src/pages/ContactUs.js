import React, { useState } from "react";
import { useHistory } from "react-router-dom";


function ContactUs({ user, loggedIn }){
  const history = useHistory()
  const [formStatus, setFormStatus] = useState("incomplete");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const submitInquiry = () => {
    const replyMessage = {
      subject: "Message Recieved",
      message: "Thank you for getting in touch with us. We have received your message and one of our team members will be reaching out as soon as possible."
    };
    const newInquiry = {
      user: user.email,
      subject: subject,
      message: message
    };
    const messages = user.messages;
    messages.push(replyMessage);
    console.log("new inquiry is", newInquiry);
    console.log("user messages are", messages)
    setFormStatus("complete");
  }

  const resetInquiryForm = () => {
    setFormStatus("incomplete");
    setSubject("");
    setMessage("");
  }

  if(loggedIn){
    if(formStatus === "incomplete") {
      return(
        <div className="outside" style={{flexDirection: "column"}}>
          <nav>
              <button className="nav-linkx" onClick={()=> history.push("/")}>Home</button>
          </nav>
          <div className="inside" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1>Contact Us</h1>
            <form id="contact-form">
              <label htmlFor="subject">Please Tell Us the Reason for Your Inquiry:</label>
              <select name="subject" id="subject" value={subject} onChange={(event)=>setSubject(event.target.value)}>
                <option value="" disabled hidden>Please Choose...</option>
                <option value="product">Product Question</option>
                <option value="booking">Reschedule Booking</option>
                <option value="financial">Refund Request</option>
                <option value="service">Other Feedback</option>
              </select>
              <label htmlFor="message">Please give us some more details to help us respond</label>
              <textarea name="message" id="message" value={message} onChange={(event)=>setMessage(event.target.value)}></textarea>
            </form>
            <button onClick={submitInquiry}>Submit</button>
          </div>
        </div>
      )
    }
    else {
      return(
        <div className="outside" style={{flexDirection: "column"}}>
          <nav>
              <button className="nav-linkx" onClick={()=> history.push("/")}>Home</button>
          </nav>
          <div className="inside" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1>Thank You!</h1>
            <h4>A representative will contact you shortly.</h4>
            <h6>Need to submit another inquiry?</h6>
            <button onClick={resetInquiryForm}>New Inquiry</button>
          </div>
        </div>
      )
    }
  }
  else {
    return(
      <div className="outside" style={{flexDirection: "column"}}>
        <nav>
            <button className="nav-linkx" onClick={()=> history.push("/")}>Home</button>
            <button className="nav-linkx" onClick={()=> history.push("/login")}>Log In</button>
        </nav>
        <div className="inside">
          <h2>Please Log In to Contact Us</h2>
        </div>
      </div>
    )
  }
}


export default ContactUs;