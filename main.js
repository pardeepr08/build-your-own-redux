import { applyMiddleware } from "./src/applyMiddleware";
import { combineReducer } from "./src/combineReducer";
import { createStore } from "./src/store";

function counter(state = 0, action) {
  if (action.type === "INCREMENT") {
    return state + 1;
  }

  if (action.type === "DECREMENT") {
    return state - 1;
  }

  return state;
}

function todo(state = [], action) {
  if (action.type === "ADD_TODO") {
    return [...state, action.payload];
  }

  return state;
}

const reducer = combineReducer({
  count: counter,
  todo: todo,
});

const initialState = {
  count: 0,
  todo: [],
};

function middleware1(store) {
  return next => action => {
    console.log('middleware1')
    next(action);
  }
}

// middleware function
function middleware2(store) {
  return next => action => {
    console.log('middleware2')
    next(action);
  }
}

// middleware function
function logger(store) {
  return next => action => {
    console.log(`state before action ${action.type}`, store.getState());
    next(action);
    console.log(`state after action ${action.type}`, store.getState());
  };
}

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(middleware1, middleware2, logger)
);

store.dispatch({ type: "INCREMENT" });

store.dispatch({ type: "ADD_TODO", payload: 100 });