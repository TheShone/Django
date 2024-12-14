import React from "react";
import { Link } from "react-router-dom";
const TaskListComponent = ({ task,deleteTask }) => {
  return (
    <div className="w-1/3 p-6 bg-white border rounded-lg shadow dark:bg-gray-200 dark:border-gray-200">
      <Link to={`/product/${task.id}`}>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
          {task.title}
        </h5>
      </Link>
      <p className="mb-3 font-normal text-gray-700 dark:text-black text-xl">
        {task?.description?.substring(0, 60)}...
      </p>
      <div className="flex justify-between">
        <Link
          to={`/task/${task.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg dark:bg-gray-400 dark:text-black-50"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
        <div className="flex justify-between">
          <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg dark:bg-red-600 text-white " onClick={()=>{deleteTask(task?.id)}}>
            Delete
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
          
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskListComponent;
