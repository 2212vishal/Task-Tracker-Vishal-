import React, { useState, useEffect } from 'react';
import CreateTask from './CreateTask';
import TaskCard from './TaskCard';
import EditTask from './EditTask';

function TaskBoard() {
    // State variables
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [filters, setFilters] = useState({
    assignee: '',
    priority: '',
    fromDate: '',
    toDate: '',
  });

  // useEffect to update localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to filter tasks based on filters state
  const filteredTasks = tasks.filter((task) => {
    const assigneeMatch = !filters.assignee || task.assignees === filters.assignee;
    const priorityMatch = !filters.priority || task.priority === filters.priority;
    const dateRangeMatch =
      (!filters.fromDate || new Date(task.startDate) >= new Date(filters.fromDate)) &&
      (!filters.toDate || new Date(task.endDate) <= new Date(filters.toDate));
    return assigneeMatch && priorityMatch && dateRangeMatch;
  });

  // Function to sort tasks based on sortBy parameter
  const sortTasks = (taskList, sortBy) => {
    if (sortBy === 'priority') {
      const priorityOrder = { P0: 0, P1: 1, P2: 2 };
      return taskList.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === 'date') {
      return taskList.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    } else if (sortBy === 'endDate') {
      return taskList.sort((a, b) => {
        if (!a.endDate) return 1;
        if (!b.endDate) return -1;
        return new Date(a.endDate) - new Date(b.endDate);
      });
    }
    return taskList;
  };

  // Functions to handle adding, deleting, and editing tasks
  
  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setShowCreateForm(false);
  };


  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleEditTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    if (updatedTask.status === 'Completed' && !updatedTask.endDate) {
      updatedTask.endDate = new Date().toLocaleDateString(); // Add current date as end date
    }
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setEditTaskIndex(null);
  };

  const handleEditClick = (index) => {
    setEditTaskIndex(index);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className='w-full lg:w-9/10 flex flex-col items-center gap-3'>
      <div className='flex flex-col lg:flex-row items-center justify-between gap-1'>
        <div className='flex flex-col'>
          <div>
            <label htmlFor='sort'>Sort By</label>
            <select name='sort' id='sort' className='bg-blue-200 border rounded'>
              <option value='priority'>Priority</option>
              <option value='date'>Start Date</option>
              <option value='endDate'>End Date</option>
            </select>
          </div>
          <div className='flex flex-col lg:flex-row gap-1'>
            <p>Filter By</p>
            <input
              type='text'
              name='assignee'
              placeholder='Assignee name'
              onChange={handleFilterChange}
              className='border rounded p-1'
            />
            <select name='priority' onChange={handleFilterChange} className='bg-blue-200 border rounded'>
              <option value=''>Priority</option>
              <option value='P0'>P0</option>
              <option value='P1'>P1</option>
              <option value='P2'>P2</option>
            </select>
            <input type='date' name='fromDate' onChange={handleFilterChange} className='border rounded p-1' />
            <input type='date' name='toDate' onChange={handleFilterChange} className='border rounded p-1' />
          </div>
        </div>
        <div>
          <button className='bg-red-500 p-2 border rounded' onClick={() => setShowCreateForm(true)}>
            Add New Task
          </button>
          {showCreateForm && (
            <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 flex justify-center items-center z-50'>
              <CreateTask onAddTask={handleAddTask} setShowCreateForm={setShowCreateForm} />
            </div>
          )}
          {editTaskIndex !== null && (
            <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 flex justify-center items-center z-50'>
              <EditTask
                task={tasks[editTaskIndex]}
                index={editTaskIndex}
                onEditTask={(updatedTask) => handleEditTask(editTaskIndex, updatedTask)}
              />
            </div>
            
            
          )}
        </div>
      </div>

      <div className='w-full flex flex-col justify-center lg:flex-row gap-1'>
        <div className='border rounded text-center m-1'>
          <p className='bg-gray-200 border rounded'>Pending</p>
          {sortTasks(filteredTasks.filter((task) => task.status === 'Pending'), 'priority').map((task, index) => (
            <TaskCard
              key={index}
              index={index}
              onDeleteTask={handleDeleteTask}
              onEditTask={() => handleEditClick(index)}
              {...task}
            />
          ))}
          {filteredTasks.filter((task) => task.status === 'Pending').length === 0 && <p>No tasks assigned</p>}
        </div>
        <div className='border rounded text-center m-1'>
          <p className='bg-yellow-500 border rounded'>In Progress</p>
          {sortTasks(filteredTasks.filter((task) => task.status === 'In Progress'), 'priority').map((task, index) => (
            <TaskCard
              key={index}
              index={index}
              onDeleteTask={handleDeleteTask}
              onEditTask={() => handleEditClick(index)}
              {...task}
            />
          ))}
          {filteredTasks.filter((task) => task.status === 'In Progress').length === 0 && <p>No tasks assigned</p>}
        </div>
        <div className='border rounded text-center m-1'>
          <p className='bg-green-400 border rounded'>Completed</p>
          {sortTasks(filteredTasks.filter((task) => task.status === 'Completed'), 'priority').map((task, index) => (
            <TaskCard
              key={index}
              index={index}
              onDeleteTask={handleDeleteTask}
              onEditTask={() => handleEditClick(index)}
              {...task}
            />
          ))}
          {filteredTasks.filter((task) => task.status === 'Completed').length === 0 && <p>No tasks assigned</p>}
        </div>
        <div className='border rounded text-center m-1'>
          <p className='bg-blue-900 border rounded'>Deployed</p>
          {sortTasks(filteredTasks.filter((task) => task.status === 'Deployed'), 'priority').map((task, index) => (
            <TaskCard
              key={index}
              index={index}
              onDeleteTask={handleDeleteTask}
              onEditTask={() => handleEditClick(index)}
              {...task}
            />
          ))}
          {filteredTasks.filter((task) => task.status === 'Deployed').length === 0 && <p>No tasks assigned</p>}
        </div>
        <div className='border rounded text-center m-1'>
          <p className='bg-red-400 border rounded'>Deferred</p>
          {sortTasks(filteredTasks.filter((task) => task.status === 'Deferred'), 'priority').map((task, index) => (
            <TaskCard
              key={index}
              index={index}
              onDeleteTask={handleDeleteTask}
              onEditTask={() => handleEditClick(index)}
              {...task}
            />
          ))}
          {filteredTasks.filter((task) => task.status === 'Deferred').length === 0 && <p>No tasks assigned</p>}
        </div>
      </div>
    </div>
  );
}

export default TaskBoard;

