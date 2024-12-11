import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token,setToken]=useState(localStorage.getItem(ACCESS_TOKEN));
  const navigate = useNavigate();
  useEffect(()=>{
    if(token)
        navigate("/");
  },[token,redirect])
  const loginUser = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await api.post("/api/login/", { username, password });
      if (res.status == 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        setRedirect(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-100">
      <div className="flex flex-col  max-w-md p-6 rounded-xl sm:p-10 dark:bg-gray-50 dark:text-gray-800">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm dark:text-gray-600">
            Sign in to access your account
          </p>
        </div>
        <form className="space-y-12" onSubmit={loginUser}>
          <div className="space-y-4">
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
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md dark:bg-blue-400 dark:text-gray-50"
              >
                Sign in
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-600">
              Don't have an account yet?
              <a
                rel="noopener noreferrer"
                href="/register"
                className="hover:underline dark:text-blue-400"
              >
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
