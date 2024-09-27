import axiosInstance from "../axios/axiosInstance";

export async function RegisterUser(data) {
  let fetchData = await axiosInstance.post("/auth/register", data);
  return fetchData;
}

export async function loginWithUsername(data) {
  let fetchData = await axiosInstance.post("/auth/login", data);
  return fetchData;
}
export async function loginWithEmail(data) {
  let fetchData = await axiosInstance.post("/auth/login", data);
  return fetchData;
}

export async function createBlogQueryFunction(data) {
  let fetchData = await axiosInstance.post("/blog/create", data);
  return fetchData;
}
export async function getAllBlogsOfUser(sort) {
  let fetchData = await axiosInstance.get(`/blog/user?sort=${sort}`);
  return fetchData
}
export async function getBlogById(id) {
  let fetchData = await axiosInstance.get(`/blog/id/${id}`);
  return fetchData
  
}
export async function getBlogOwnerById(id) {
  let fetchData = await axiosInstance.get(`/blog/ownerid/${id}`);
  return fetchData
}
export async function getCommentsByBlogs(id) {
  let fetchData = await axiosInstance.get(`comment/get/${id}`);
  return fetchData;
}
export async function addCommentToBlog(blogid,commentdata) {
  let fetchData = await axiosInstance.post(`comment/add/${blogid}`,commentdata);
  return fetchData
}
export async function getAllBlogs() {
  let fetchData = await axiosInstance.get(`/blog/all`);
  return fetchData
}
export async function updateBlogById(id,data) {
  let fetchData=await axiosInstance.patch(`blog/update/${id}`,data)
  return fetchData
}
export async function  deleteBlogById(id) {
  let fetchData=await axiosInstance.delete(`blog/delete/${id}`);
  return fetchData
}
export async function LogoutUser() {
  let fetchData=await axiosInstance.delete("/auth/logout")
  return fetchData
  
}