import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import api from "../api";
const Task = () => {
  const {id: taskId} = useParams();
  const [title,setTitle] = useState();
  const [description,setDescription] = useState();
  const [status,setStatus] = useState();
  const [createdat,setCreatedat] = useState();
  useEffect(()=>{
    getTask();
  })
  const getTask = async()=>{
    try{
      const res = await api.get(`/api/tasks/getTask/${taskId}/`);
      if(res.status===200)
      {
        setTitle(res.data?.title);
        setDescription(res.data?.description);
        setStatus(res.data?.status);
        setCreatedat(res.data?.created_at);
      }
    }
    catch(error)
    {
      alert(error);
    }
  }
  return (
    <div>
      
    </div>
  )
}

export default Task
