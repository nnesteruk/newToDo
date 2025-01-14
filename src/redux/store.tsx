import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import todoReducer from './reducers/todoReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk, ThunkAction, ThunkDispatch } from 'redux-thunk';

const rootReducer = combineReducers({
  todoReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootReducerType = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export default store;
