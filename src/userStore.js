import { createStore } from 'redux';

const initialState = {
    isauthenticated: false,
    hasRole: ""
};

function reducer(state = initialState, action) {
  const {isauthenticated = false, userRole = ""} = action.payload || {};
  switch (action.type) {
    case 'UPDATE_AUTH_DATA':
      return { isauthenticated: isauthenticated, hasRole: userRole };
    default:
      return state;
  }
}

const userStore = createStore(reducer);

export default userStore;
