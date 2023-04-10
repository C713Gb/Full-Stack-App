import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

const configureStore = () => {
  const store = createStore(reducers, persistedState,compose(applyMiddleware(thunk)));
  store.subscribe(()=>{
    // save a copy to localStorage
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  })
  return store;
};

export default configureStore;
