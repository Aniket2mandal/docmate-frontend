import axiosInstance from "../service/axiosInstance";

export const getAllDoctors = (page = 0, size = 9) => {
  return axiosInstance.get(`/public/get-all-doctor?page=${page}&size=${size}`);
};

export const getAllDoctorsAdmin = (page = 0, size = 9) => {
  return axiosInstance.get(`/admin/get-all-doctor?page=${page}&size=${size}`);
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

export const deleteScheduleApi = (scheduleId) => {
  return axiosInstance.delete(`/doctor/delete-schedule/${scheduleId}`);
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

export const getAllMedicalRecordsApi = () => {
  return axiosInstance.get("/medical-record/medical-records");
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


export const createMedicalRecord = (medicalRecordRequest, testReports) => {
  const formData = new FormData();

  formData.append(
    "medicalRecordRequest",
    new Blob([JSON.stringify(medicalRecordRequest)], {
      type: "application/json",
    })
  );

  if (testReports && testReports.length > 0) {
    Array.from(testReports).forEach((file) => {
      formData.append("testReports", file);
    });
  }

  return axiosInstance.post("/medical-record/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getMedicalRecordByAppointmentId = (appointmentId) => {
  return axiosInstance.get(`/medical-record/appointment-medical-record/${appointmentId}`);
};

export const getMedicalRecordByIdApi = (medicalRecordId) => {
  return axiosInstance.get(`/medical-record/${medicalRecordId}`);
};

export const getAllPatientApi = () => {
  return axiosInstance.get("/admin/get-all-patient");
};

export const createDoctorApi = (doctorRequest) => {
  return axiosInstance.post("/admin/create-doctor", doctorRequest);
};

export const updateDoctorApi = (doctorId, data) => {
  return axiosInstance.put(
    `/admin/update-doctor/${doctorId}`,
    data
  );
};

export const deleteDoctorApi = (doctorId) => {
  return axiosInstance.delete(`/admin/delete-doctor/${doctorId}`);
};

export const deletePatientApi = (patientId) => {
  return axiosInstance.delete(`/admin/delete-patient/${patientId}`);
};

export const changeUserStatusApi = (userId, status) => {
  return axiosInstance.put(`/admin/change-status/${userId}`, {
    status: status,
  });
};

export const rateDoctorApi = (data) => {
    return axiosInstance.post("/patient/rate-doctor", data);
};

export const createRoleApi = (data) => {
  return axiosInstance.post("/admin/create-role", data);
};

export const getAllRoleApi = () => {
  return axiosInstance.get("/admin/get-all/role");
};

export const deleteRoleApi = (roleId) => {
  return axiosInstance.delete(`/delete/role/${roleId}`);
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

