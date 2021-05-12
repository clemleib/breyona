import React from 'react'

const BalanceModal = function({ earnings, onClick, id }) {
  let rdash = 0
  let rltc = 0
  let rusd = 0
  let reth = 0
  let rbtc = 0
  let rbch = 0
  const dash = earnings.filter(a => a.type === 'dash')
  const ltc = earnings.filter(a => a.type === 'ltc')
  const usd = earnings.filter(a => a.type === 'usd')
  const eth = earnings.filter(a => a.type === 'eth')
  const btc = earnings.filter(a => a.type === 'btc')
  const bch = earnings.filter(a => a.type === 'bch')
  if (dash.length > 0) {
    rdash = dash.reduce((p, n) => p + n.amount, 0)
  }
  if (ltc.length > 0) {
    rltc = ltc.reduce((p, n) => p + n.amount, 0)
  }
  if (usd.length > 0) {
    rusd = usd.reduce((p, n) => p + n.amount, 0)
  }
  if (eth.length > 0) {
    reth = eth.reduce((p, n) => p + n.amount, 0)
  }
  if (btc.length > 0) {
    rbtc = btc.reduce((p, n) => p + n.amount, 0)
  }
  if (bch.length > 0) {
    rbch = bch.reduce((p, n) => p + n.amount, 0)
  }
  return (
    <div>
      <button
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#bal${id}`}
        onClick={onClick}
      >
        Check Balance
      </button>

      {/* bal Modal es */}
      <div
        className="modal fade"
        id={`bal${id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Balance
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
                <ul>
                  <li>USD - {rusd}</li>
                  <li>BTC - {rbtc}</li>
                  <li>ETH - {reth}</li>
                  <li>LTC - {rltc}</li>
                  <li>BCH - {rbch}</li>
                  <li>DASH - {rdash}</li>
                </ul>
              </div>
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

export default BalanceModal
