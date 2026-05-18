import axiosInstance from "../service/axiosInstance";

export const getAllDoctors = (page = 0, size = 9) => {
  return axiosInstance.get(`/public/get-all-doctor?page=${page}&size=${size}`);
};

export const getPatientUpcomingAppointments = (patientId) => {
  return axiosInstance.get(`/appointment/get-patient-upcoming-appointment/${patientId}`);
};

export const getPatientPreviousAppointments = (patientId) => {
  return axiosInstance.get(`/appointment/get-patient-previous-appointment/${patientId}`);
};

export const getAppointmentDetails = (appointmentId) => {
  return axiosInstance.get(`/appointment/get-appointment-details/${appointmentId}`);
};

export const getDoctorDetails = (doctorId) => {
  return axiosInstance.get(`/public/get-doctor-details/${doctorId}`);
};

export const bookAppointment = (appointmentData) => {
  return axiosInstance.post("/appointment/book", appointmentData);
};

// NOT USED YET
export const getAllSchedule = (doctorId) => {
  return axiosInstance.get(`/doctor/get-all-schedule/${doctorId}`);
};


export const getAvailableSlots = (doctorId) => {
  return axiosInstance.get(`/doctor/get-available-slots/${doctorId}`);
};

export const getUserProfile = () => {
  return axiosInstance.get("/auth/user-profile");
};

export const uploadUserImage = (userId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post(`/auth/upload-user-image/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const recommendDoctorsBySymptoms = (symptoms) => {
  return axiosInstance.post("/recommendation/doctors-by-symptoms", {
    symptoms: symptoms,
  });
};

export const createDoctorSchedule = (scheduleData) => {
  return axiosInstance.post("doctor/create-schedule", scheduleData);
};

export const logoutUser = () => {
  return axiosInstance.post("/auth/logout");
};

export const loginUser = (username, password) => {
  return axiosInstance.post("/auth/login-user", {
    username,
    password,
  });
};

export const registerUser = (userData) => {
  return axiosInstance.post("auth/register-patient", userData);
};

