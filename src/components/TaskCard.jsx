import React, { useState } from 'react';
import DeleteTask from './DeleteTask';

function TaskCard({ index, title, description, teamName, assignees, priority, status, onDeleteTask, onEditTask }) {
  // State variable for showing options menu and delete popup
  const [showOptions, setShowOptions] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleEditClick = () => {
    onEditTask(index);
    setShowOptions(false);
  };


  // Event handlers for options menu and delete popup
  const handleDeleteClick = () => {
    setShowDeletePopup(true);
     setShowOptions(false);
  };

  const handleDeleteConfirm = () => {
    onDeleteTask(index);
    setShowDeletePopup(false);
  };

  const handleDeleteCancel = () => {
    setShowDeletePopup(false);
  };

  return (
    <div className='bg-gray-300 border rounded flex flex-col m-5 gap-2 p-4'>
      <div className='flex justify-between border-b-2 border-gray-500'>
        <b>{title}</b>
        <div className='p-1 text-white bg-blue-600 border rounded'>{priority}</div>
      </div>
      <p>{description}</p>

      <div className='flex justify-between p-3'>
        <p>{assignees}</p>
        <div className='relative inline-block text-left z-0'>
          <button onClick={toggleOptions} className='focus:outline-none border rounded p-1 bg-blue-500 '>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M11.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
            </svg>
          </button>
          {showOptions && (
            <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
              <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
                <button onClick={handleEditClick} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left' role='menuitem'>
                  Edit Task
                </button>
                <button onClick={handleDeleteClick} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left' role='menuitem'>
                  Delete Task
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='flex justify-center border rounded bg-blue-500 text-white'>
        {status}
      </div>

      {showDeletePopup && (
        <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 flex justify-center items-center'>
          <DeleteTask title={title} onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} />
        </div>
      )}
    </div>
  );
}

export default TaskCard;
