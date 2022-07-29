import React, { useContext, useRef, useState } from "react";
import TodoContext from "../context/TodoContext";

function Modal(props) {
  const content = props.contentType;
  const element = useRef(null);
  const { onDeleteTask, message } = useContext(TodoContext);
  
  const delTask = () => {
    onDeleteTask(props.delId.id).then(() => {
      element.current.click();
      props.setDeleteId((prev) => ({
        ...prev,
        isDeleted: true,
      }));
    });
  };


  return (
    <div className="modal fade" id="popup" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog vertically-centered">
        <div className="modal-content bg-primary">
          <div className="modal-header py-2 border-bottom-0">
            <span
              className="ms-auto text-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
          <div className="modal-body text-white">
            {content === "viewtask" ? (
              <div></div>
            ) : content === "edittask" ? (
              <div className="pb-4">

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
