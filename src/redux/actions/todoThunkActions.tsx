import axios from 'axios';
import { apiUrl } from '../../components/TaskList';
import {
  addTaskAction,
  deleteTaskAction,
  getTasksAction,
  isCompletedTaskAction,
  updateTaskAction,
} from './todoActions';
import { Dispatch } from 'redux';

export const axiosGetTasks = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/api/todos`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(getTasksAction(response.data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const axiosAddTask = (name: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/todos`,
        { title: name },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      );
      dispatch(addTaskAction(response.data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const axiosDeleteTask = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.delete(`${apiUrl}/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(deleteTaskAction(id));
    } catch (err) {
      console.error(err);
    }
  };
};

export const axiosIsCompletedTask = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.patch(`${apiUrl}/api/todos/${id}/isCompleted`, undefined, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(isCompletedTaskAction(response.data[0]));
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
};
export const axiosUpdateTask = (id: number, title: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/api/todos/${id}`,
        { title },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      );
      dispatch(updateTaskAction(response.data));
    } catch (err) {
      console.error(err);
    }
  };
};
