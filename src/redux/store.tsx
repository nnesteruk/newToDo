import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import todoReducer from './reducers/todoReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';

export type RootReducerType = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
const rootReducer = combineReducers({
  todoReducer,
});
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
