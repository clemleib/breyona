import React from 'react'

const Modal = props => (
  <div>
    <button
      className="btn btn-danger"
      data-toggle="modal"
      data-target={`#del${props.id}`}
    >
      Delete
    </button>

    {/* del Modal es */}
    <div
      className="modal fade"
      id={`del${props.id}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Delete
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="text">
              <p>Are you sure!!</p>
              <p>You are about to delete this record</p>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => props.onModalClick(props.user)}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Modal
