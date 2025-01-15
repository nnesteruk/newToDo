import { List } from '../../redux/slices/todoSlice.types';

export type UpdateTask = (id: number, newValue: string) => void;
export type DeleteTask = (id: number) => void;
export type IsCompletedTask = (id: number) => void;

export type Props = {
  item: List;
  deleteTask: DeleteTask;
  updateTask: UpdateTask;
  isCompletedTask: IsCompletedTask;
};
export type TaskEditProps = {
  updateTask: UpdateTask;
  title: string;
  id: number;
  onCancel: () => void;
};

export type TaskActionsProps = {
  onChange: () => void;
  onDelete: () => void;
};
