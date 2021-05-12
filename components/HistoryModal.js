import React, { Component } from 'react'
import moment from 'moment';

class HistoryModal extends Component {
  styles = () => {
    return {
      borderBottom: `thin solid #000`
    }
  }
  render() {
    const { histories } = this.props
    if (histories.length > 0) {
      History = histories.map((history, i) => (
        <ul
          style={{ borderBottom: 'thin solid #000', marginBottom: '10px' }}
          key={i}
        >
          <li>
            {i + 1} - {moment(history.date).format('YYYY-MM-DD')}
          </li>
          {/* <li>{moment(history.date).format("l")}</li> */}
          <li>{history.type}</li>
          <li>
            {history.site ? (
              <span>
                {history.site} {history.site_type}
              </span>
            ) : (
              ''
            )}
          </li>
          <li>{history.address ? history.address : ''}</li>
          <li>{history.amountType}</li>
          <li>{history.amount || ''}</li>
          {/* <td>{this.checkValue(history.value, history.type)}</td> */}
        </ul>
      ))
    } else {
      History = (
        <tr>
          <td colSpan="7" style={{ textAlign: 'center' }}>
            You have no histories to show
          </td>
        </tr>
      )
    }

    return (
      <div>
        <button
          className="btn btn-primary"
          data-toggle="modal"
          data-target={`#hm${this.props.id}`}
        >
          View
        </button>

        {/* History Modal es */}
        <div
          className="modal fade"
          id={`hm${this.props.id}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  History
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
                <div className="text">{History}</div>
              </div>
              <div className="modal-footer">
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
  }
}

export default HistoryModal
