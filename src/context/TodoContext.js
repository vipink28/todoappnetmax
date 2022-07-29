import { createContext, useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';

const TodoContext = createContext();

const baseUrl = "http://localhost:7000"

export const TodoProvider = ({children})=>{
    // const [user, setUser] = useState([]);
    const [tasks, setTasks] = useState([]);

    //success or unsuccessfull message for registration and login
    const [message, setMessage] = useState("");
    const [loggedUser, setLoggedUser] = useState({
        isLoggedIn: false,
        currentUserId: null,
        currentUserName: null,
    });
    

    const navigate = useNavigate();

    // create User
    const register = async(userData) =>{
        const obj={
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        }
        try{
            const response = await fetch(`${baseUrl}/users?email=${userData.email}`, {method: "GET"});
            if(response.ok){
                const res = await response.json();
                if(res.length > 0){
                    setMessage("user already exist");
                }
                else{
                    const newResponse = await fetch(`${baseUrl}/users`, obj)
                    if(!newResponse) throw Error("Please reload the app");                
                    
                    const latestResponse = await fetch(`${baseUrl}/users`, {method:"GET"});
                    if(!latestResponse) throw Error("Please reload the app");
                    let responseBody = await latestResponse.json();
                    let res = responseBody[responseBody.length - 1];
                    setLoggedUser((prev)=>({
                        ...prev,
                        isLoggedIn: true,
                        currentUserId: res.id,
                        currentUserName: res.username
                    }))
                    setMessage("Successfully Registered");
                    setTimeout(()=>{
                        setMessage("")
                        navigate('/task-list');    
                    }, 2000);
                    
                }
            }        
            
        }
        catch(err){
            console.log(err.message);
        }
    }

    //User Login
    const login = async(userData)=>{
        try{
            const response = await fetch(`${baseUrl}/users?email=${userData.email}&password=${userData.password}`,
            { method: "GET" });
            if(response.ok){
                let responseBody = await response.json();
                if (responseBody.length > 0) {
                    setLoggedUser((prev)=>({
                        ...prev,
                        isLoggedIn: true,
                        currentUserId: responseBody[0].id,
                        currentUserName: responseBody[0].username
                    }))
                    setMessage("Logged In Successfully");                 
                    setTimeout(()=>{
                        setMessage("")
                        navigate('/task-list');
                    }, 2000);
                } else {
                  setMessage(
                    <span className="text-danger">Invalid Login, please try again</span>
                  );
                }
              } else {                    
                setMessage(
                  <span className="text-danger">Unable to connect to server</span>
                );
                throw Error('Please reload the app');
              }
        }
        catch(err){
          console.log(err.message);
        }
    }

    // Create Task

    const createTask=async(formData)=>{
        const obj={
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }
        try{
            const response = await fetch(`${baseUrl}/tasks`, obj);
            if(response.ok){
                setMessage("Task Created Successfully");
                setTimeout(()=>{
                    setMessage("");
                }, 5000)
            }
            else{
                throw Error ("Please reload the app");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    //getTasks   

    const getTasks=useCallback(async(userId)=>{
        try{
            const response = await fetch(`${baseUrl}/tasks?userId=${userId}&_sort=id&_order=desc`, {method:"GET"});
            if(response.ok){
                let task = await response.json();
                setTasks(task);
            }
            else{
                throw Error ("Please reload the app");
            }
        }
        catch(err){
            console.log(err)
        }        
    }, []) 

    const updateTask = async(formData, taskId) =>{
        const obj={
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }
        try{
            const response = await fetch(`${baseUrl}/tasks/${taskId}`, obj);
            if(response.ok){
                setMessage("Task Updated Successfully");
                setTimeout(()=>{
                    setMessage("");
                }, 5000)
            }
            else{
                throw Error ("Please reload the app");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const onDeleteTask=async(id)=>{
        try{
            var response = await fetch(`${baseUrl}/tasks/${id}`, {method:"DELETE"});
            if(!response.ok) throw Error('Please reload the app');
            let allTasks = [...tasks]
            allTasks = allTasks.filter((task)=>{return task.id !== id});
            setTasks(allTasks);
            setMessage("Deleted Successfully");
            setTimeout(()=>{
                setMessage("");
            }, 5000)
        }
        catch(err){
          console.log(err.message);
        }
    }

    return (
        <TodoContext.Provider value={{
            message,
            loggedUser,
            tasks,
            setMessage,
            register,
            login,
            createTask,
            getTasks,
            updateTask,
            onDeleteTask
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContext;