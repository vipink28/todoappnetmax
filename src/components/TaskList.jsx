import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../common/Modal";
import TodoContext from "../context/TodoContext";
import { dateFormat } from "../utils";

const initialState = {};
function reducer(state, action) {
  switch (action.type) {
    case "DELETE":
      return { ...state, task: action.payload, modelValue: "delete" };
    case "VIEW":
      return { ...state, task: action.payload, modelValue: "viewtask" };
    case "EDIT":
      return { ...state, task: action.payload, modelValue: "edittask" };
    default:
      throw new Error();
  }
}

function TaskList(props) {
  const [search, setSearch] = useState("");
  const [userState, setUserState] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tasks, getTasks } = useContext(TodoContext);

  const filteredTasks = tasks.filter(
    (task) => task.title.toLowerCase().indexOf(search.toLowerCase()) >= 0
  );
  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("userState"));
    if (localData) {
      setUserState(localData);
    }
  }, []);

  useEffect(() => {
    if (userState.currentUserId !== undefined) {
      getTasks(userState.currentUserId);
    }
  }, [userState, getTasks]);

  return (
    <div className="container">
      <div className="bg-primary p-5 text-white mt-5">
        <div className="d-flex">
          <h3>My Task List</h3>
          <Link to="/create-task" className="btn btn-info ms-auto">
            {" "}
            <i className="fa-solid fa-pen-to-square"></i>Create Task
          </Link>
        </div>
        <div className="position-relative mt-3">
          <i
            className="fa-solid fa-magnifying-glass mt-1 text-secondary position-absolute"
            style={{ top: "7px", left: "10px" }}
          ></i>
          <input
            className="form-control ps-5"
            type="search"
            placeholder="search by title"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="table-responsive-xl">
          <table className="table text-white mt-5">
            <thead>
              <tr>
                <th>Created On</th>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{dateFormat(item.dateCreated)}</td>
                    <td>{item.title}</td>
                    <td>
                      <span className="text-limit">{item.description}</span>
                    </td>
                    <td>{dateFormat(item.datetime)}</td>
                    <td>
                      <span
                        className="mx-2"
                        role="button"
                        data-bs-toggle="modal"
                        data-bs-target="#popup"
                        onClick={() =>
                          dispatch({ type: "VIEW", payload: item })
                        }
                      >
                        <i className="fa-solid fa-eye"></i>
                      </span>
                      <span
                        className="mx-2"
                        role="button"
                        data-bs-toggle="modal"
                        data-bs-target="#popup"
                        onClick={() =>
                          dispatch({ type: "EDIT", payload: item })
                        }
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </span>
                      <span
                        className="mx-2"
                        role="button"
                        data-bs-toggle="modal"
                        data-bs-target="#popup"
                        onClick={() =>
                          dispatch({ type: "DELETE", payload: item })
                        }
                      >
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal content={state} />
    </div>
  );
}

export default TaskList;
