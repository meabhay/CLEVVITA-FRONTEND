// services/GlobalApi.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const createNewResume = (data) => axiosClient.post("/resumes", data);

export const getUserResumes = (userEmail) =>
  axiosClient.get(`/resumes?userEmail=${userEmail}`);

export const getResumeById = (id) => axiosClient.get(`/resumes/${id}`);

export const deleteResume = (id) => axiosClient.delete(`/resumes/${id}`);

export const updateResumeDetail = (data, id) =>
  axiosClient.put(`/resumes/${id}`, data);

export default createNewResume;
