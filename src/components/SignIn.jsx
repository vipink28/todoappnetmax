import React, { useContext, useEffect, useRef, useState } from "react";
import TodoContext from "../context/TodoContext";

function SignIn(props) {
    const [formData, setFormData]=useState({
        username: "",
        email: "",
        password: ""
    })
    const inputField = useRef(null);
    const {message, login, setMessage} = useContext(TodoContext);
    const [errors, setErrors] = useState({
      email:[],
      username: [],
      password: []
  })

  const [dirty, setDirty] = useState({
      email:false,
      username: false,
      password: false
  });
  const validate = ()=>{
    let errorsData = {};
    //email
    errorsData.email = [];
    //if email is blank
    if(!formData.email){
        errorsData.email.push("Please provide email");
    }

    let emailreg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

    if(formData.email){
        if(!emailreg.test(formData.email)){
            errorsData.email.push("Please enter valid email")
        }
    }

    //password

    errorsData.password = [];
    //if email is blank
    if(!formData.password){
        errorsData.password.push("Please provide password");
    }

    // let passreg = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;

    // if(user.password){
    //     if(!passreg.test(user.password)){
    //         errorsData.password.push("Password should be minimu 8 characters with atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character");
    //     }            
    // }
    setErrors(errorsData);
}

useEffect(validate,[formData]);

let isValid = ()=>{
  let valid = true;
  for(let control in errors){
      if(errors[control].length>0){
          valid = false;
      }
  }
 return valid; 
}

const onblurHandle=(event)=>{
  const {name} = event.target;
  setDirty((dirty)=>({
      ...dirty,
      [name]: true
  }))
  validate();
}

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: value,
        }))
    }

    const onLogin = (e) =>{
        e.preventDefault();
        if(isValid()){
          login(formData);
      }
      else{
          const currValue = inputField.current.value;
          if(!currValue){
          Object.keys(dirty).forEach((abc) => dirty[abc] = true)
      }
          setMessage(<div className="text-danger">Please resolve errors in the form</div>)
      }
    }
  
  return (
    <>
      <form className="login" id="login-form">
        <div className="mb-4">
          <label className="form-label" htmlFor="username">
            Email
          </label>
          <input
            className="form-control"
            type="text"
            name="email"
            id="username"
            ref={inputField}
            onChange={handleChange}
            onBlur={onblurHandle}
          />
          <div className="text-danger">{dirty["email"]&&errors["email"][0]?errors["email"]:""}</div>
        </div>
        <div className="mb-4">
          <label className="form-label" htmlFor="username">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            ref={inputField}
            autoComplete="off"
            onChange={handleChange}
            onBlur={onblurHandle}
          />
          <div className="text-danger">{dirty["password"]&&errors["password"][0]?errors["password"]:""}</div>
        </div>
        <p>{message}</p>
        <button className="btn bg-primary text-white px-5 py-2" onClick={onLogin}>Login</button>
        <div className="mt-3">
          <p>
            Forgot Username/Password ? <br />
            <a className="text-info" href="#password-reset">             
              Click here</a> to reset.
          </p>
        </div>
      </form>
    </>
  );
}

export default SignIn;
