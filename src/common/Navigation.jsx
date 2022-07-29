import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import TodoContext from "../context/TodoContext";


function Navigation(props) {
  const { loggedUser } = useContext(TodoContext);
  const [loggedState, setLoggedState] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedUser.isLoggedIn) {
      localStorage.setItem("userState", JSON.stringify(loggedUser));
    }
    let localData = JSON.parse(localStorage.getItem("userState"));
    setLoggedState(localData);
  }, [loggedUser]);

  

  const logout = () =>{
    localStorage.removeItem("userState");
    setLoggedState("");
    navigate("/");
  }

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-white" aria-label="Third navbar example">
    
    <div className="container">
      <NavLink className="navbar-brand" to="/"><img src="logo.png" alt="Todo App" /></NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample03">
        <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink> 
          </li>
          {
            loggedState?<>
            <li className="nav-item">
            <NavLink className="nav-link" to="/task-list">Task List</NavLink> 
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/create-task">Create Task</NavLink>
          </li>          
          <li className="nav-item dropdown">
          <button className="dropdown-toggle" type="button" id="nav-dropdown" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-user"></i> 
          {loggedState.currentUserName}</button>            
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="nav-dropdown">
              <li><NavLink className="dropdown-item" to="profile">Profile</NavLink> </li>
              <li className="dropdown-item logout" onClick={logout}>Logout</li>
            </ul>
          </li>
          </>:""   
          }                
        </ul>        
      </div>
    </div> 
  </nav>
    );
}

export default Navigation;