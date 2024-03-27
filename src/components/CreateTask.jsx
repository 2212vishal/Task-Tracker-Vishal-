import React, { useState } from 'react';

const CreateTask = ({ onAddTask, setShowCreateForm }) => {
    // State variable for form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    teamName: '',
    assignees: '',
    priority: 'P0',
    status: 'Pending',
    startDate: new Date().toLocaleDateString(), 
    endDate: ""
  });


  // Event handlers for form interactions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCancel=()=>{
    setShowCreateForm(false);

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(formData);
    setShowCreateForm(false);
    setFormData({
      title: '',
      description: '',
      teamName: '',
      assignees: '',
      priority: 'P0',
      status: 'Pending',
      startDate: new Date().toLocaleDateString(), 
      endDate: ""
    });
  };

  return (
    <div className="flex flex-col gap-2 bg-slate-400 border rounded p-2">
      <div className='flex justify-between p-3'>
        <h3 className='text-center'>Create a New Task</h3>
        <button onClick={handleCancel}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <div className='flex'>
            <label htmlFor="title">Title:</label>
            <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className='border rounded p-1'
            />
        </div>
        
        <div className='flex flex-col'>
            <label htmlFor="description">Description:</label>
            <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className='border rounded p-1'
            ></textarea>
        </div>
        
        <div className='flex'>
            <label htmlFor="teamName">Team Name:</label>
            <input
            type="text"
            id="teamName"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            required
            className='border rounded p-1'
            />
        </div>

        <div className='flex'>
            <label htmlFor="assignees">Assignees:</label>
            <input
            type="text"
            id="assignees"
            name="assignees"
            value={formData.assignees}
            onChange={handleChange}
            required
            className='border rounded p-1'
            />
        </div>
        
        <div className='flex'>
            <label htmlFor="priority">Priority:</label>
            <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
            className='border rounded'
            >
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            </select>
        </div>
        
        <button className='bg-blue-500 p-2 border rounded'  type="submit">Submit Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
