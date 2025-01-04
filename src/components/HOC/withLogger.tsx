import React, { useEffect } from 'react';

export const withLogger = (WrappedComponent) => {
  return (props) => {
    const logAction = (action, otherParam) => {
      console.log(`Action ${action}`, otherParam);
    };
    const newProps = {
      ...props,
      deleteTask: (id) => {
        logAction('Delete Task', { id });
        props.deleteTask(id);
      },
      updateTask: (id, newValue, setChangeText) => {
        logAction('Update Task', { id, newValue });
        props.updateTask(id, newValue, setChangeText);
      },
      isCompletedTask: (id) => {
        logAction('Completed Task', { id });
        props.isCompletedTask(id);
      },
    };
    return <WrappedComponent {...newProps} />;
  };
};
