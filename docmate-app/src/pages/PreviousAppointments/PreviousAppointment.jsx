import { useState,useEffect } from "react";
import "./PreviousAppointment.css";
import SideBar from "../../components/SideBar/SideBar";
import Navbar from "../../components/Navbar/Navbar";
import { getPatientPreviousAppointments } from "../../api/BackendApi";


const PreviousAppointments = () => {

   const [appointments, setAppointments] = useState([]);
 const [loading, setLoading] = useState(true);

  const patientId = localStorage.getItem("patientId"); 

    useEffect(() => {

       console.log("Calling API...");
      
    const fetchAppointments = async () => {
      try {
        const res = await getPatientPreviousAppointments(patientId);
        setAppointments(res.data.data || []);
      } catch (err) {
        console.error("Error fetching appointments", err);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      console.log("Calling API 2nd...");
      fetchAppointments();
    }
  }, [patientId]);

  return (
    <div className="dashboard-upcoming-page">
      <SideBar />

      <div className="dashboard-upcoming-main">
        <Navbar />

        <div className="dashboard-upcoming-content">
          <div className="upcoming-header">
            <h1>Previous Appointments</h1>
            <p>Your scheduled previous visits</p>
          </div>

         <div className="table-card">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="upcoming-table">
                <thead>
                  <tr>
                    <th>S.N.</th>
                    <th>Doctor</th>
                    <th>Hospital</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((appt,index) => (
                      <tr key={appt.id}>
                        <td>{index+1}</td>
                        <td>{appt.doctor?.user?.firstName} {appt.doctor?.user?.lastName}</td>
                        <td>{appt.hospitalName}</td>
                        <td>{appt.appointmentDateTime}</td>

                        <td>
                           <a href="/appointment-detail" style={{ textDecoration: 'none', color: 'inherit' }}><button className="view-btn">
                            View Details
                          </button></a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No previous appointments</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PreviousAppointments;