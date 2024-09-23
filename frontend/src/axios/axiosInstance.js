import axios from "axios";
console.log("backend url",import.meta.env.VITE_BACKEND_URL);

const axiosInstance=axios.create({baseURL:import.meta.env.VITE_BACKEND_URL,withCredentials:true});
export default axiosInstance