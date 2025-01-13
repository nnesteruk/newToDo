import {
  ActionsType,
  ADD_TASK,
  DELETE_TASK,
  GET_TASK,
  IS_COMPLETED_TASK,
  UPDATE_TASK,
} from '../actions/todoActions';

export type List = {
  id: number;
  title: string;
  isCompleted: boolean;
  user_id: number;
};

const initialState = {
  list: [] as List[],
};
type InitialStateType = typeof initialState;

const todoReducer = (
  state: InitialStateType = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case GET_TASK:
      return { ...state, list: action.payload };
    case ADD_TASK:
      return { ...state, list: [...state.list, { ...action.payload }] };
    case UPDATE_TASK:
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.payload.id ? { item, ...action.payload } : item,
        ),
      };
    case DELETE_TASK:
      return { ...state, list: state.list.filter((item) => item.id != action.payload) };
    case IS_COMPLETED_TASK:
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.payload.id ? { item, ...action.payload } : item,
        ),
      };
    default:
      return state;
  }
};

export default todoReducer;
