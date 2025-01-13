import { List } from '../reducers/todoReducer';

export type ActionsType =
  | ReturnType<typeof getTasksAction>
  | ReturnType<typeof addTaskAction>
  | ReturnType<typeof updateTaskAction>
  | ReturnType<typeof deleteTaskAction>
  | ReturnType<typeof isCompletedTaskAction>;

export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const IS_COMPLETED_TASK = 'IS_COMPLETED_TASK';
export const GET_TASK = 'GET_TASK';
export const addTaskAction = (newTask: List) => {
  return {
    type: ADD_TASK,
    payload: newTask,
  } as const;
};
export const updateTaskAction = (updateTask: List) => {
  return {
    type: UPDATE_TASK,
    payload: updateTask,
  } as const;
};

export const deleteTaskAction = (id: number) => {
  return {
    type: DELETE_TASK,
    payload: id,
  } as const;
};

export const isCompletedTaskAction = (updatedTask: List) => {
  return {
    type: IS_COMPLETED_TASK,
    payload: updatedTask,
  } as const;
};

export const getTasksAction = (tasks: List[]) => {
  return {
    type: GET_TASK,
    payload: tasks,
  } as const;
};
