import React from 'react';
import { DeleteTask, IsCompletedTask, UpdateTask } from '../TaskList';

type Props = {
  [key: string]: any;
  deleteTask: DeleteTask;
  updateTask: UpdateTask;
  isCompletedTask: IsCompletedTask;
};
type LogAction = (action: string, otherParam: { [key in string]: any }) => void;
export const withLogger = <T extends Props>(WrappedComponent: React.ComponentType<T>) => {
  return (props: T) => {
    const logAction: LogAction = (action, otherParam) => {
      console.log(`Action ${action}`, otherParam);
    };

    const newProps: Props = {
      ...props,
      deleteTask: (id) => {
        logAction('Delete Task', { id });
        props.deleteTask(id);
      },
      updateTask: (id, newValue) => {
        logAction('Update Task', { id, newValue });
        props.updateTask(id, newValue);
      },
      isCompletedTask: (id) => {
        logAction('Completed Task', { id });
        props.isCompletedTask(id);
      },
    };
    return <WrappedComponent {...(newProps as T)} />;
  };
};
