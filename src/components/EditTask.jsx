import React, { useState } from 'react';

function EditTask({ task, index, onEditTask }) {
  // State variable for edited task
  const [editedTask, setEditedTask] = useState({ ...task });

  // Event handler for form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditTask(editedTask);
  };

  return (
    <div className="flex flex-col gap-2 bg-slate-400 border rounded p-2">
      <h3 className='text-center'>Edit Task</h3>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <div className='flex'>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            required
            className='border rounded'
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            required
            className='border rounded'
          ></textarea>
        </div>

        <div className='flex'>
          <label htmlFor="teamName">Team Name:</label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            value={editedTask.teamName}
            onChange={handleChange}
            required
            className='border rounded'
          />
        </div>

        <div className='flex'>
          <label htmlFor="assignees">Assignees:</label>
          <input
            type="text"
            id="assignees"
            name="assignees"
            value={editedTask.assignees}
            onChange={handleChange}
            required
            className='border rounded'
          />
        </div>

        <div className='flex'>
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
            required
            className='border rounded'
          >
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
        </div>

        <div className='flex'>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={editedTask.status}
            onChange={handleChange}
            required
            className='border rounded'
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Deployed">Deployed</option>
            <option value="Deferred">Deferred</option>
          </select>
        </div>

        <button className='bg-blue-500 p-2 border rounded' type="submit">Edit Task</button>
        <button className='bg-blue-500 p-2 border rounded' type="button" onClick={() => onEditTask(task)}>Cancel Task Edit</button>

      </form>
    </div>
  )
}

export default EditTask;
