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
import DashboardUser from './pages/DashboardUser/DashboardUser';
import DashboardUserDoctors from './pages/DashboardUser/DashboardUserDoctors';
import WhyChoose from "./pages/WhyChoose/WhyChoose";
import Testimonial from "./pages/Testimonial/Testimonial";
import Enroll from "./pages/Enroll/Enroll";
import Footer from "./pages/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

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

        {/* Separate page */}
        <Route path="/dashboard" element={<DashboardUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/doctors" element={<DashboardUserDoctors />} />

      </Routes>
    </Router>
  );
}

export default App;