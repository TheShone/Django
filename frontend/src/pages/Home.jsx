import { useState, useEffect } from "react";
import api from "../api";
import TaskListComponent from "../components/TaskListComponent";
import { ACCESS_TOKEN } from '../constants';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [created, setCreated] = useState(false);
  const [user,setUser] = useState(localStorage.getItem(ACCESS_TOKEN))
  useEffect(() => {
    getTasks();
  }, [deleted, created,user]);
  const getTasks = async () => {
    try {
      const res = await api
        .get("/api/tasks/")
        .then((res) => res.data)
        .then((data) => {
          setTasks(data);
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await api.delete(`/api/tasks/delete/${id}/`);
      if (res.status === 204) {
        setDeleted(!deleted);
        toast.success("Task deleted");
      } else toast.error("Error");
    } catch (error) {
     toast.error(error.data);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/api/tasks/`, { title, description });
      if (res.status === 201) {
        setCreated(!created);
        toast.success("Task created");
      } else toast.error("Error");
    } catch (error) {
      toast.error(error.data);
    }
  };
  return (
    <>
    <ToastContainer />
      <section className="p-6">
        <form onSubmit={createTask} className="container flex flex-col mx-auto ">
          <fieldset className="grid  gap-6 p-6 rounded-xl shadow-sm dark:bg-gray-200">
            <div className="grid  col-span-full lg:col-span-3">
              <div className="col-span-full">
                <label for="Title" className="text-xl">
                  Title
                </label>
                <input
                  id="Title"
                  type="text"
                  placeholder="Title"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-black-50 focus:dark:ring-blue-400 dark:border-gray-300"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="col-span-full ">
                <label htmlFor="bio" className="text-xl">
                  Description
                </label>
                <textarea
                  id="bio"
                  placeholder=""
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-black-50 focus:dark:ring-blue-400 dark:border-gray-300"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 font-semibold rounded-md dark:bg-gray-400 dark:text-black-50"
            >
              Add
            </button>
          </fieldset>
        </form>
      </section>
      <div className="flex flex-wrap justify-start container mx-auto">
        {tasks.map((task) => (
            <TaskListComponent task={task} deleteTask={deleteTask}/>
        ))}
      </div>
    </>
  );
};
export default Home;
