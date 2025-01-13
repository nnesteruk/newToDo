import axios from 'axios';
import { apiUrl } from '../../components/TaskList';
import {
  addTaskAction,
  deleteTaskAction,
  getTasksAction,
  isCompletedTaskAction,
  updateTaskAction,
} from './todoActions';

export const axiosGetTasks = () => {
  return async (dispatch) => {
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

export const axiosAddTask = (name) => {
  return async (dispatch) => {
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

export const axiosDeleteTask = (id) => {
  return async (dispatch) => {
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

export const axiosIsCompletedTask = (id) => {
  return async (dispatch) => {
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
export const axiosUpdateTask = (id, title) => {
  return async (dispatch) => {
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
