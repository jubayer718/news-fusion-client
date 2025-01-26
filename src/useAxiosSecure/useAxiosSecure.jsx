import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import { GiHangGlider } from "react-icons/gi";

const axiosSecure = axios.create({
  baseURL:import.meta.env.VITE_url,
})

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { handleLogOut } = UseAuth();
  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token');
    // console.log('request stopped by interceptors', token);
    config.headers.authorization = `Bearer ${token}`

    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });



  
  //intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(function (response) {
    return response
  }, async(error)=> {
    const status = error.response.status;
    // console.log('status error in the interceptor',status);
    // TODO: set status 403
    if (status === 401||status===403 ) {
      await handleLogOut();
      navigate('/login')
    }
      return Promise.reject(error);
  })




  return axiosSecure




};

export default useAxiosSecure;