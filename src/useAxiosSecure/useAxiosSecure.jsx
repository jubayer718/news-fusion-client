import axios from "axios";

const axiosSecure = axios.create({
  baseURL:import.meta.env.VITE_url,
})

const useAxiosSecure = () => {
  return axiosSecure
};

export default useAxiosSecure;