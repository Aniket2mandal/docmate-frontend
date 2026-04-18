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

/* Create a combined landing page */
const LandingPage = () => {
  return (
    <>
      <Home />
      <Doctors />
      <WhyChoose />
      <Testimonial />
      <Enroll/>
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

        {/* Separate page */}
          <Route path="/dashboard/user" element={<User />} />
          <Route path="/dashboard/doctors" element={<Doctor />} />
          <Route path="/dashboard/medical-records" element={<MedicalRecords />} />
          <Route path="/dashboard/medicine-reports" element={<MedicineReports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upcoming-appointments" element={<UpcomingAppointments />} />
          <Route path="/previous-appointments" element={<PreviousAppointments />} />
          <Route path="/appointment-detail" element={<AppointmentDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;