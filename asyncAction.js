const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');


//create a middlewarwe "redux logger"
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();


//defining the reducer
//(prevState, action) => newState
//example with one state obj manage all the state
const initialState = {
    loading: false,
    data: [],
    error:``,
  };

//defining a action creater, one action creater manage one type of state
const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";


  const fetchUsersRequest = () => {
    return {
      type: FETCH_USER_REQUEST,
    };
  }
  const fecthUsersSuccess = users => {
    return {
      type: FETCH_USER_SUCCESS,
      payload: users,
    };
  }
  const fecthUsersFailure = error => {
    return {
      type: FETCH_USER_FAILURE,
      payload: error,
    };
  }


  //example with one reducer function manage all the action
  const reducer = (state = initialState , action) =>{
    switch (action.type) {
        case FETCH_USER_REQUEST:
          return {
            ...state,
            loading: true,
          };

        case FETCH_USER_SUCCESS:
            return {
              ...state,
              loading: false,
              data:action.payload,
              error:``,
            }; 

        case FETCH_USER_FAILURE:
          return {
            ...state,
            loading: false,
            data:[],
            error:action.payload,
          };
    
        default:
          return state;
      }
  }

  const fetchUsers = () =>{

    return function(dispatch){
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                //response.data is the array of users
                const users  = response.data.map(user=> user.id)
                dispatch(fecthUsersSuccess(users))
            })
            .catch(error=>{
                //error.message
                dispatch(fecthUsersFailure(error.message)) 
            })
    }
  }




  const store = createStore(reducer,applyMiddleware(thunkMiddleware,logger));
  store.subscribe(() => {console.log("Updated State", store.getState())})

  store.dispatch(fetchUsers())