import React from 'react';

function DeleteTask({ title, onConfirm, onCancel }) {
  return (
    <div className='flex flex-col gap-2 border bg-slate-400 rounded items-center p-3'>
      <b className='bg-slate-100 p-4 w-full'>DELETE TASK</b>
      <p>Do you wish to delete task:</p>
      <div className='flex items-center space-x-4 gap-3'>
        <b>{title}</b>
        <div className='flex gap-2 m-2'>
          <button onClick={onConfirm} className='p-2 bg-blue-700 border-black rounded'>
            Yes
          </button>
          <button onClick={onCancel} className='p-2 bg-blue-700 border-black rounded'>
            No
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default DeleteTask;
