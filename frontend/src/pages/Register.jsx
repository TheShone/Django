import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurame] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem(ACCESS_TOKEN));
  const navigate = useNavigate();
  useEffect(() => {
    if (token) navigate("/");
  }, [token, redirect]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(username, password, email, name, surname, birthDate);
      const formattedBirthDate = new Date(birthDate).toISOString().split('T')[0];
        const res = await api.post("/api/user/register/", {
          username,
          password,
          email,
          first_name:name,
          last_name:surname,
          birth_date:formattedBirthDate,
        });
      if (res.status == 201) {
        setRedirect(true);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-100">
      <ToastContainer />
      <div className="flex flex-col w-1/5 p-6 rounded-xl sm:p-10 dark:bg-gray-50 dark:text-gray-800">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Register</h1>
          <p className="text-sm dark:text-gray-600">Create your account</p>
        </div>
        <form className="space-y-12" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Surname</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                value={surname}
                onChange={(e) => setSurame(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm">Password</label>
              </div>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Birth date</label>
              <DatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
              />
            </div>
            
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md dark:bg-blue-400 dark:text-gray-50"
              >
                Register
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-600">
              Have account yet?
              <a
                rel="noopener noreferrer"
                href="/login"
                className="hover:underline dark:text-blue-400"
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
