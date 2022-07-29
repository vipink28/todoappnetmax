import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TodoContext from "../context/TodoContext";
import { dateFormat } from "../utils";

function CreateTask(props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    datetime: "",
  });
  const [userState, setUserState] = useState({});
  const [recentTask, setRecentTask] = useState();
  const [isTaskUpdate, setIsTaskUpdate] = useState(false);
  const [mostRecentTasks, setMostRecentTasks] = useState([]);
  const { message, createTask, tasks, getTasks, updateTask } =
    useContext(TodoContext);

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("userState"));
    if(localData){
      setUserState(localData);
    }    
  }, []);

  useEffect(()=>{
    if(userState.currentUserId !== undefined){
      getTasks(userState.currentUserId)
    }
  }, [userState, getTasks])

  useEffect(()=>{
    if(tasks.length >= 3){
      const trimTasks = tasks.slice(1,4);
      setMostRecentTasks(trimTasks)
    }
    else{
      setMostRecentTasks(tasks.slice(1));
    }
  },[tasks])

  let datentime = new Date();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      userId: userState.currentUserId,
      dateCreated: datentime
    }));
  };

  const onCreateTask = (e) => {
    e.preventDefault();    
    createTask(formData).then(getTasks(userState.currentUserId));
    setRecentTask(formData);
    setFormData({
      title: "",
      description: "",
      datetime: "",
    });
  };

  const editRecentTask = (e) => {

    getTasks(userState.currentUserId);
    setFormData({
      title: tasks[0].title,
      description: tasks[0].description,
      datetime: tasks[0].datetime,
    });
    setIsTaskUpdate(true);
  };

  const onUpdateTask = (e) => {
    e.preventDefault();
    updateTask(formData, tasks[0].id);
  };

  const onCreateNewTask = (e) => {
    e.preventDefault();    
    setFormData({
      title: "",
      description: "",
      datetime: "",
    });
    setIsTaskUpdate(false);
  };

  return (
    <div className="container-fluid main">
      <div className="row h-100">
        <div className="col-xl-6 h-100 bg-primary">
          <div className="row h-100 align-items-center justify-content-center">
            <div className="col-xl-8">
              <h2 className="text-white mb-3">Create Task</h2>
              <div className="card">
                <div className="card-body">
                  <form className="task" id="task-form">
                    <div className="mb-4">
                      <label className="form-label" htmlFor="title">
                        Title
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="description">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="datetime">
                        datetime
                      </label>
                      <input
                        className="form-control"
                        type="datetime-local"
                        name="datetime"
                        id="datetime"
                        value={formData.datetime}
                        onChange={handleChange}
                      />
                    </div>
                    <p>{message}</p>
                    {!isTaskUpdate ? (
                      <button
                        className="btn bg-primary text-white px-5 py-2 mb-2"
                        onClick={onCreateTask}
                      >
                        Create Task
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn bg-primary text-white px-5 py-2 mb-2"
                          onClick={onUpdateTask}
                        >
                          Update Task
                        </button>
                        <button
                          className="btn bg-primary text-white px-5 py-2 ms-2 mb-2"
                          onClick={onCreateNewTask}
                        >
                          Create New
                        </button>
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 d-flex align-items-center">
          <div className="row flex-grow-1 justify-content-center">
            <div className="col-xl-8">
              <div className="card bg-primary text-white pt-4 px-3 pb-2">
                {recentTask ? (
                  <>
                    <div className="card-header bg-transparent d-flex align-items-center">
                      <h4>New Task</h4>{" "}
                      <button
                        className="btn btn-info ms-auto"
                        onClick={editRecentTask}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>Edit
                      </button>
                    </div>
                    <div className="card-body">
                      <h4>{recentTask.title}</h4>
                      <p>{recentTask.description}</p>
                    </div>
                    <div className="card-footer bg-transparent d-flex">
                      <p className="text-secondary">Created: {dateFormat(recentTask.dateCreated)} </p>
                      <p className="ms-auto text-secondary">
                        Due: {dateFormat(recentTask.datetime)}
                      </p>
                    </div>
                  </>
                ) : tasks.length > 0 ? (
                  <>
                    <div className="card-header bg-transparent d-flex align-items-center">
                      <h4>New Task</h4>{" "}
                      <button
                        className="btn btn-info ms-auto"
                        onClick={editRecentTask}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>Edit
                      </button>
                    </div>
                    <div className="card-body">
                      <h4>{tasks[0].title}</h4>
                      <p>{tasks[0].description}</p>
                    </div>
                    <div className="card-footer bg-transparent d-flex jusfiy-content-between">
                      <p className="text-secondary">Created: {dateFormat(tasks[0].dateCreated)}</p>
                      <p className="ms-auto text-secondary">
                        Due: {dateFormat(tasks[0].datetime)}
                      </p>
                    </div>
                  </>
                ) : (
                  "no data"
                )}
              </div>
              
              {mostRecentTasks.length > 0 ?
              <div className="card bg-primary text-white pt-4 px-3 pb-2 mt-5">
              <div className="card-header">
                <h4>Recently Added</h4>                  
                </div>
                <div className="card-body">                                  
                  {mostRecentTasks.map((item) => {
                    return (
                      <div className="d-flex" key={item.id}>
                        <p>{item.title}</p>
                        <p className="ms-auto">{dateFormat(item.datetime)}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="card-footer">
                    <Link className="text-white text-decoration-none text-secondary" to="/task-list">View more</Link>
                </div>
              </div>:""
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
