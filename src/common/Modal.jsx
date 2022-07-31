import React, { useContext, useEffect, useRef, useState } from "react";
import TodoContext from "../context/TodoContext";
import {dateFormat} from "../utils/index";

function Modal(props) {
  const init = {
    title: "",
    description: "",
    datetime: ""
  }
  const content = props.content;
  const task = props.content.task;
  const [formData, setFormData] = useState(init);  
  const element = useRef(null);
  const { onDeleteTask, message, updateTask } = useContext(TodoContext);
  
  useEffect(()=>{
    if(task){
      setFormData(task);
    }
  }, [task])


  const delTask = (e) => {
    onDeleteTask(content.task.id).then(()=>{
       var popup = e.target.closest('#popup');
       setTimeout(()=>{
        popup.style.display = "none";
        document.querySelector(".modal-backdrop").style.display = "none";
    }, 3000);
    });
  };

  let datentime = new Date();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      dateCreated: datentime
    }));
  };

  const onUpdateTask = (e) => {
    e.preventDefault();
    console.log(element.current);
    updateTask(formData, content.task.id).then(()=>{
      var popup = e.target.closest('#popup');
      setTimeout(()=>{
       popup.style.display = "none";
       document.querySelector(".modal-backdrop").style.display = "none";
   }, 3000);
    });
  };


  return (
    <div className="modal fade" id="popup" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-primary">
          <div className="modal-header py-2 border-bottom-0">
            <span
              className="ms-auto text-white close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark fs-4"></i>
            </span>
          </div>
          <div className="modal-body text-white">
          
            {content.modelValue === "viewtask" ? ( 

              <div className="card bg-primary text-white pt-4 px-3 pb-2">                    
                    <div className="card-body">
                      <h4>{content.task.title}</h4>
                      <p>{content.task.description}</p>
                    </div>
                    <div className="card-footer bg-transparent d-flex flex-sm-row flex-column">
                      <p className="text-secondary">Created: {dateFormat(content.task.dateCreated)} </p>
                      <p className="ms-sm-auto text-secondary">
                        Due: {dateFormat(content.task.datetime)}
                      </p>
                    </div>
              </div>

            ) : content.modelValue === "edittask" ? (

              <div className="pb-4">
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
                  
                      <button
                        className="btn bg-info text-black px-5 py-2 mb-2"
                        onClick={onUpdateTask}
                      >
                        Update Task
                      </button>              
                  </form>
              </div>

            ) : (
              <div className="pb-4">
                {message === "" ? (
                  <>
                    <p> Are you sure you want to delete the task?</p>
                    <button className="btn btn-danger me-2" onClick={delTask}>
                      Yes
                    </button>
                    <button
                      className="btn btn-secondary"
                      ref={element}
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <p>{message}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(Modal);
