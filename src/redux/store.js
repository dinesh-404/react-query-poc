import { createStore, combineReducers } from "redux";
import PostsReducer from "./reducers/reducer";


const reducer = combineReducers({
	PostsReducer,
});
const store = createStore(reducer);

export default store;
