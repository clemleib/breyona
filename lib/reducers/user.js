import { GET_USER_DETAILS, GET_ALL_USERS } from '../constants/actionType'

const initialState = {
  user: {},
  earnings: {
    usd: 0,
    btc: 0,
    eth: 0,
    ltc: 0,
    dash: 0,
    bch: 0
  },
  sites: [],
  histories: [],
  users: [],
  earnings: [],
  histories: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DETAILS:
      return {
        ...state,
        ...action.user
      }
    case GET_ALL_USERS:
      return {
        ...state,
        users: [...action.users],
        earnings: [...action.earnings],
        histories: [...action.histories]
      }
    default:
      return state
  }
}
