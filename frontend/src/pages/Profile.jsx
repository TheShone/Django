import React from "react";
import { useState, useEffect } from "react";
import api from "../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {
  const [flag, setFlag] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [birthDate, setBirthDate] = useState();
  useEffect(() => {
    getUser();
  }, [flag]);
  const getUser = async () => {
    try {
      const res = await api.get("/api/user/get/");
      if (res.status === 200) {
        setName(res?.data?.first_name);
        setSurname(res?.data?.last_name);
        setUsername(res?.data?.username);
        setEmail(res?.data?.email);
        setBirthDate(res?.data?.birth_date);
        console.log(res.data);
      }
    } catch (error) {
      alert(error);
    }
  };
  const handleUpdate = async (e)=>{
    e.preventDefault();
    const formattedBirthDate = new Date(birthDate).toISOString().split('T')[0];
    try{
      const res = await api.put("/api/user/put/", {
        username,
        password,
        email,
        first_name:name,
        last_name:surname,
        birth_date:formattedBirthDate,
      })
      if(res.status===200)
      {
        toast.success("Profile successfully updated");
        setFlag(!flag);
      }
    }
    catch(error)
    {
      toast.error(error.data)
    }
  }
  return (
    <form className="space-y-6">
      <ToastContainer />
      <div className="grid grid-cols-2 max-w-screen-xl gap-8 px-8 py-16 mx-auto rounded-lg  md:px-12 lg:px-16 xl:px-32 mt-5 dark:bg-gray-100 dark:text-gray-800">
        <div>
          <label htmlFor="name" className="text-sm">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder=""
            className="w-full p-3 rounded dark:bg-gray-100"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name" className="text-sm">
            Surname
          </label>
          <input
            id="name"
            type="text"
            placeholder=""
            className="w-full p-3 rounded dark:bg-gray-100"
            value={surname}
            onChange={(e)=>setSurname(e.target.value)}

          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-3 rounded dark:bg-gray-100"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}

          />
        </div>
        <div>
          <label htmlFor="message" className="text-sm">
            Username
          </label>
          <input
            type="text"
            id="message"
            rows="3"
            className="w-full p-3 rounded dark:bg-gray-100"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}

          ></input>
        </div>
        <div>
          <label className="block mb-2 text-sm">Birth date</label>
          <DatePicker
            selected={birthDate}
            onChange={(date) => setBirthDate(date)}
          />
        </div>
        <div>
          <label htmlFor="message" className="text-sm">
            Password
          </label>
          <input
            type="password"
            id="message"
            rows="3"
            className="w-full p-3 rounded dark:bg-gray-100"
            onChange={(e)=>setPassword(e.target.value)}

          ></input>
        </div>
        <button
          type="submit"
          className="w-full px-8 py-3 font-semibold rounded-md dark:bg-gray-400 dark:text-black-50"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default Profile;
