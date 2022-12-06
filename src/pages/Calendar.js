import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import appointments from "../data/openappointments";


function Calendar({ user, loggedIn }){
  const history = useHistory();
  const currentDate = new Date();
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const [calendarMonth, setCalendarMonth] = useState(currentDate.getMonth());
  const [calendarYear, setCalendarYear] = useState(currentDate.getFullYear());
  const [dayAppointments, setDayAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDayButton, setSelectedDayButton] = useState(0);
  const [selectedAppoint, setSelectedAppoint] = useState(" ");
  const monthAppointments = appointments[calendarYear.toString()][calendarMonth]
  const daysInMonth = (month, year) => {
    const firstDay = new Date(year, month-1, 1);
    let dayOfWeek = firstDay.getDay();
    const numberOfDays = new Date(year, month, 0).getDate();
    let result = new Array(42);
    for(let i = 1; i <= numberOfDays; i++){
      result[dayOfWeek] = i;
      dayOfWeek += 1;
    }
    for (let j=0; j < result.length; j++) {
      if(result[j] === undefined){
        result[j] = " ";
      }
    }
    return result
  }
  const backMonth = () => {
    if(calendarMonth === 0){
      setCalendarYear(calendarYear-1)
      setCalendarMonth(11)
    }
    else{
      setCalendarMonth(calendarMonth-1)
    }
  }
  const forwardMonth = () => {
    if(calendarMonth === 11){
      setCalendarYear(calendarYear+1)
      setCalendarMonth(0)
    }
    else{
      setCalendarMonth(calendarMonth+1)
    }
  }
  
  const showAppointments = (day) => {
    const apptArray = monthAppointments[day.toString()];
    setDayAppointments(apptArray);
    setSelectedDate(`${monthNames[calendarMonth]} ${day}, ${calendarYear}`);
    setSelectedDayButton(day);
    setSelectedAppoint(" ");
  }

  const selectAppointment = (appt) => {
    setSelectedAppoint(appt)
  }

  const bookAppointment = () => {
    const newAppointment = {
      user: user.email,
      date: `${calendarMonth}${selectedDayButton}${calendarYear}`,
      time: selectedAppoint
    }
    const bookingMessage = {
      "subject": "Appointment Confirmed",
      "message": `Your appointment has been successfully booked for ${monthNames[calendarMonth]} ${selectedDayButton}, ${calendarYear} at ${selectedAppoint}.  If you need to change or cancel this time please Contact Us`
    }
    const messages = user.messages;
    messages.push(bookingMessage);
    console.log("new appointment is", newAppointment);
    console.log("user messages are now", messages);
  }

  
  if(loggedIn){
    return (
      <div className="outside" style={{flexDirection:"column", justifyContent:"start"}}>
        <nav>
          <button className="nav-linkx" onClick={()=> history.push("/")}>Home</button>
        </nav>
        <div className="inside">
          <h3>CALENDAR</h3>
          <div style={{display: "flex", justifyContent: "space-around"}}>
            <div id="calendar-box">
              <div id="month-picker">
                <button onClick={backMonth} className="calendar-button">
                <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <span>{monthNames[calendarMonth]} {calendarYear}</span>
                <button onClick={forwardMonth} className="calendar-button">
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </div>
              <div id="week-days">
                <button className="calendar-button">Sun</button>
                <button className="calendar-button">Mon</button>
                <button className="calendar-button">Tue</button>
                <button className="calendar-button">Wed</button>
                <button className="calendar-button">Thur</button>
                <button className="calendar-button">Fri</button>
                <button className="calendar-button">Sat</button>
              </div>
              <div id="calendar-days">
                {daysInMonth(calendarMonth+1, calendarYear).map((day, index)=> {
                  if(monthAppointments[day.toString()]){
                    if(day === selectedDayButton) {
                      return (
                        <button key={index} className="calendar-button" onClick={()=>showAppointments(day)}><div className="available-day selected-button" >{day}</div></button>
                      )
                    }
                    return (
                      <button key={index} className="calendar-button" onClick={()=>showAppointments(day)}><div className="available-day" >{day}</div></button>
                    )
                  }
                  else {
                    return (
                      <button key={index} className="calendar-button" disabled>{day}</button>
                    )
                  }
                })}
              </div>
            </div>
            <div style={{ width: "40%"}}>
              <div style={{display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", height: "15%", alignItems: "center"}}>
                <div>{selectedDate}</div>
                <div>{selectedAppoint}</div>
              </div>
              <div id="appointment-box">
                {dayAppointments.map((appt) => {
                  if(selectedAppoint === appt) {
                    return(
                      <button key={appt} className="appointment-button selected-button" onClick={()=>selectAppointment(appt)}>{appt}</button>
                    )
                  }
                  return(
                    <button key={appt} className="appointment-button" onClick={()=>selectAppointment(appt)}>{appt}</button>
                  )
                })}
              </div>
              <div style={{display: "flex", justifyContent: "center"}}>
                {(() => {
                  if (selectedAppoint !== " ") {
                    return <button className="appointment-button selected-button" style={{width: "125px"}}onClick={bookAppointment}>Confirm Booking</button>;
                  } 
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="outside" style={{flexDirection:"column", justifyContent:"start"}}>
        <nav>
          <button className="nav-linkx" onClick={()=> history.push("/")}>Home</button>
          <button className="nav-linkx" onClick={()=> history.push("/login")}>Log In</button>
        </nav>
        <div className="inside">
          <h2>Please Log In to View Appointments Calendar</h2>
        </div>
      </div>
    )
  }
}


export default Calendar;