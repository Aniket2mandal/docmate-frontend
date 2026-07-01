// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css'
// import Home from './pages/Home/Home'
// import Doctors from './pages/Doctor/Doctors'
// import DashboardUser from './pages/DashboardUser/DashboardUser'
// import WhyChoose from "./pages/WhyChoose/WhyChoose";

// function App() {

//   return (
//     <Router>
//       <Routes>

//         {/* <Route path="/" element={<Home />} />
//         <Route path="/doctors" element={<Doctors />} />
//         <Route path="/why-choose" element={<WhyChoose />} /> */}
//              <Home />
//        <Doctors />
//         <WhyChoose />
//         <Route path="/dashboard" element={<DashboardUser />} />

//       </Routes>
//     </Router>
//   )
// }

// export default App
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Home from './pages/Home/Home';
import Doctors from './pages/Doctor/Doctors';
import User from './pages/DashboardUser/User/User';
import Doctor from './pages/DashboardUser/Doctor/Doctor';
import MedicalRecords from './pages/DashboardUser/MedicalRecord/MedicalRecords';
import MedicineReports from './pages/DashboardUser/MedicineReport/MedicineReports';
import WhyChoose from "./pages/WhyChoose/WhyChoose";
import Testimonial from "./pages/Testimonial/Testimonial";
import Enroll from "./pages/Enroll/Enroll";
import Footer from "./pages/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import UpcomingAppointments from "./pages/UpcomingAppointments/UpcomingAppointments";
import PreviousAppointments from "./pages/PreviousAppointments/PreviousAppointment";
import AppointmentDetail from "./pages/AppointmentDetail/AppointmentDetail";
import DoctorDashboard from "./pages/DashboardDoctor/Doctor/DoctorDashboard";
import DoctorDetail from "./pages/DoctorDetail/DoctorDetail";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import CreateSchedule from "./pages/DashboardDoctor/CreateSchedule/CreateSchedule";
import ScheduleList from "./pages/DashboardDoctor/ScheduleList/ScheduleList";
import CreateMedicalRecord from "./pages/DashboardDoctor/CreateMedicalRecord/CreateMedicalRecord";
import MedicalRecordDetail from "./pages/DashboardUser/MedicalRecordDetail/MedicalRecordDetail";
import AdminDashboard from "./pages/AdminDashboard/Admin/AdminDashboard";
import AdminPatient from "./pages/AdminDashboard/AdminPatient/AdminPatient";
import AdminDoctor from "./pages/AdminDashboard/AdminDoctor/AdminDoctor";
import CreateDoctor from "./pages/AdminDashboard/CreateDoctor/CreateDoctor";

/* Create a combined landing page */
const LandingPage = () => {
  return (
    <>
      <Home />
      <Doctors />
      <WhyChoose />
      <Testimonial />
      <Enroll />
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>

        {/* Landing page (all sections together) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/doctor-detail/:doctorId" element={<DoctorDetail />} />

        {/* Separate page */}
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute allowedRoles={["PATIENT"]}>
              <User />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/user/find-doctors"
          element={
            <ProtectedRoute allowedRoles={["PATIENT"]}>
              <Doctor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/user/medical-records"
          element={
            <ProtectedRoute allowedRoles={["PATIENT"]}>
              <MedicalRecords />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/user/medicine-reports"
          element={
            <ProtectedRoute allowedRoles={["PATIENT"]}>
              <MedicineReports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/user/upcoming-appointments"
          element={
            <ProtectedRoute allowedRoles={["PATIENT"]}>
              <UpcomingAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/user/previous-appointments"
          element={
            <ProtectedRoute allowedRoles={["PATIENT"]}>
              <PreviousAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/user/appointment-detail/:appointmentId"
          element={
            <ProtectedRoute allowedRoles={["PATIENT"]}>
              <AppointmentDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/user/medical-record-detail/:medicalRecordId"
          element={
            <ProtectedRoute allowedRoles={["PATIENT"]}>
              <MedicalRecordDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/doctor"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/doctor/schedule"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR"]}>
              <CreateSchedule />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/doctor/schedule-list"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR"]}>
              <ScheduleList />
            </ProtectedRoute>
          }
        />


        <Route
          path="/dashboard/doctor/create-medical-record/:appointmentId"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR"]}>
              <CreateMedicalRecord />
            </ProtectedRoute>
          }
        />


        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/admin/patients"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminPatient />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/admin/doctors"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDoctor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/admin/doctors/create"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CreateDoctor />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;