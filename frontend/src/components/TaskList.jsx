import React from 'react';
import TaskEmptyState from './TaskEmptyState';
import TaskCard from './TaskCard';
import { cn } from '@/lib/utils';

const TaskList = ({ filteredTask, filter, handleTaskChanged,searchTerm }) => { 
  if (!filteredTask || filteredTask.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }
  
  return (
    <div className={cn(
      "space-y-3 sm:space-y-4",
      "animate-fadeIn"
    )} style={{ animationDelay: '0.3s' }}>
      {filteredTask.map((task, index) => (
        <TaskCard
          key={task._id ?? index}
          task={task}
          index={index}
          handleTaskChanged={handleTaskChanged}
          searchTerm={searchTerm}
        />
      ))}
    </div>
  );
};

export default TaskList;