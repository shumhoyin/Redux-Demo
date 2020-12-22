//import redux from 'redux'
const redux = require("redux");


const createStore = redux.createStore;
//use for combining multiple reducers
const combineReducers = redux.combineReducers;

//create a middlewarwe "redux logger"
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;


//defining a action creater, one action creater manage one type of state
//BUY_CAKE just like a shop keeper responsoble for managing cake only
const BUY_CAKE = "BUY_CAKE";

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}

const BUY_ICECREAM = "BUY_ICECREAM";
function buyIceCream() {
  return {
    type: BUY_ICECREAM,
    info: "Second redux action",
  };
}

//defining the reducer
//(prevState, action) => newState
//example with one state obj manage all the state
const initialState = {
  numOfCakes: 10,
  numOfIceCream: 20,
};

//----------------------------------------------
//example with one state obj manage one state
const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCream: 20,
};

//example with one reducer function manage all the action
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1,
      };

    default:
      return state;
  }
};


// the action will be stored in Store
// const store = createStore(reducer);


//example with one reducer function manage one type of  action
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
      case BUY_CAKE:
        return {
          ...state,
          numOfCakes: state.numOfCakes - 1,
        };
  
      default:
        return state;
    }
  };
  
  const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
      case BUY_ICECREAM:
        return {
          ...state,
          numOfIceCream: state.numOfIceCream - 1,
        };
  
      default:
        return state;
    }
  };

//combine muliple reducer to one root reducer
  const rootReducer = combineReducers({
       cake: cakeReducer,
       iceCream: iceCreamReducer
  })
  
  //create reducer with middleware
  const store = createStore(rootReducer, applyMiddleware(logger));



console.log("initial state", store.getState());

//any time the store updated, we log the console
//using suscrible to listening the store
const unsubscribe = store.subscribe(() =>
//  console.log("Updated State", store.getState())
{}
);
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
// store.subscribe(()=> console.log('Updated State', store. ()))

store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());


  //to end the  unsubscrition(); // end looking for state
 unsubscribe();
