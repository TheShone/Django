import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { ToastContainer, toast } from 'react-toastify';

const Task = () => {
  const { id: taskId } = useParams();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();
  const [createdat, setCreatedat] = useState();
  const [updated, setUpdated] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/api/tasks/put/${taskId}/`, {
        title,
        description,
        status,
        createdat,
      });
      if (res.status === 200) {
        toast.success("Task is updated");
        setUpdated(!updated);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getTask();
  }, [updated]);
  const getTask = async () => {
    try {
      const res = await api.get(`/api/tasks/getTask/${taskId}/`);
      if (res.status === 200) {
        console.log(res.data);
        setTitle(res.data?.title);
        setDescription(res.data?.description);
        setStatus(res.data?.status);
        setCreatedat(res.data?.created_at);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div>
      <ToastContainer />
      <section className="py-6 dark:bg-gray-200  mt-5">
        <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
          <input
            type="text"
            className="text-5xl font-bold leading-none text-center rounded-xl bg-gray-300 border-gray-800 border-collapse focus:border-gray-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="pt-2 pb-8 text-xl w-1/2 font-medium text-center rounded-xl bg-gray-300 border-collapse focus:border-gray-200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="flex justify-between w-1/2">
            <button
              className="px-8 py-3 text-lg font-semibold rounded-xl dark:bg-gray-400 dark:text-black-50" type="submit"
              onClick={handleUpdate}
            >
              Update
            </button>
            {!status && (
              <button onClick={(e) => setStatus(!status)}>
                <span className="inline-flex items-center bg-green-100 text-green-800 text-2xl font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  Active
                </span>
              </button>
            )}
            {status && (
              <button onClick={(e) => setStatus(!status)}>
                <span className="inline-flex items-center bg-red-100 text-red-800 text-2xl font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                  Finished
                </span>
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Task;
