import React, { useEffect, useState } from "react";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import {
    createMedicalRecord,
    getMedicalRecordByAppointmentId,
} from "../../../api/BackendApi";
import Swal from "sweetalert2";
import "./CreateMedicalRecord.css";

const CreateMedicalRecord = ({ darkMode, toggleDarkMode }) => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();

    const [diagnosis, setDiagnosis] = useState("");
    const [notes, setNotes] = useState("");
    const [testReports, setTestReports] = useState([]);
    const [testReportPreviews, setTestReportPreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [existingRecordId, setExistingRecordId] = useState(null);
    const location = useLocation();
    const patientName = location.state?.patientName;


    const [medications, setMedications] = useState([
        {
            medicineName: "",
            dosage: "",
            frequency: "",
            timeSchedule: "",
            startDate: "",
            endDate: "",
            instruction: "",
            status: "ACTIVE",
        },
    ]);

    const frequencyOptions = [
        "ONCE_DAILY",
        "TWICE_DAILY",
        "THREE_TIMES_DAILY",
        "FOUR_TIMES_DAILY",
        "EVERY_6_HOURS",
        "EVERY_8_HOURS",
        "EVERY_12_HOURS",
        "WEEKLY",
        "AS_NEEDED",
    ];

    const statusOptions = ["ACTIVE", "COMPLETED", "STOPPED"];

    useEffect(() => {
        if (appointmentId) {
            fetchExistingMedicalRecord();
        }
    }, [appointmentId]);

    const fetchExistingMedicalRecord = async () => {
        try {
            const response = await getMedicalRecordByAppointmentId(appointmentId);

            if (response.data?.status === true && response.data?.data) {
                const record = response.data.data;

                setExistingRecordId(record.medicalRecordId || null);
                setDiagnosis(record.diagnosis || "");
                setNotes(record.notes || "");

                if (record.medications && record.medications.length > 0) {
                    setMedications(
                        record.medications.map((medication) => ({
                            medicineName: medication.medicineName || "",
                            dosage: medication.dosage || "",
                            frequency: medication.frequency || "",
                            timeSchedule: medication.timeSchedule || "",
                            startDate: medication.startDate || "",
                            endDate: medication.endDate || "",
                            instruction: medication.instruction || "",
                            status: medication.status || "ACTIVE",
                        }))
                    );
                }

                if (record.testReports && record.testReports.length > 0) {
                    setTestReportPreviews(
                        record.testReports.map((report, index) => ({
                            name: `Test Report ${index + 1}`,
                            url: report.reportUrl,
                            existing: true,
                        }))
                    );
                }
            }
        } catch (error) {
            console.log("No existing medical record found for this appointment.");
        }
    };

    const handleMedicationChange = (index, e) => {
        const { name, value } = e.target;

        const updatedMedications = [...medications];
        updatedMedications[index][name] = value;

        setMedications(updatedMedications);
    };

    const addMedication = () => {
        setMedications([
            ...medications,
            {
                medicineName: "",
                dosage: "",
                frequency: "",
                timeSchedule: "",
                startDate: "",
                endDate: "",
                instruction: "",
                status: "ACTIVE",
            },
        ]);
    };

    const removeMedication = (index) => {
        if (medications.length === 1) {
            return;
        }

        const updatedMedications = medications.filter((_, i) => i !== index);
        setMedications(updatedMedications);
    };

    const handleTestReportChange = (e) => {
        const selectedFiles = Array.from(e.target.files || []);

        if (selectedFiles.length === 0) {
            return;
        }

        const newPreviews = selectedFiles.map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file),
            existing: false,
        }));

        setTestReports((previousFiles) => [
            ...previousFiles,
            ...selectedFiles,
        ]);

        setTestReportPreviews((previousPreviews) => [
            ...previousPreviews,
            ...newPreviews,
        ]);

        e.target.value = "";
    };

    const removeTestReport = (index) => {
        const removedPreview = testReportPreviews[index];

        if (removedPreview?.url && removedPreview.existing === false) {
            URL.revokeObjectURL(removedPreview.url);
        }

        const updatedPreviews = testReportPreviews.filter((_, i) => i !== index);
        setTestReportPreviews(updatedPreviews);

        if (removedPreview?.existing === false) {
            const newFileIndex = testReportPreviews
                .slice(0, index)
                .filter((preview) => preview.existing === false).length;

            const updatedFiles = testReports.filter((_, i) => i !== newFileIndex);
            setTestReports(updatedFiles);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!appointmentId) {
            Swal.fire({
                icon: "error",
                title: "Appointment not found",
                text: "Appointment id is missing.",
            });
            return;
        }

        if (!diagnosis.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Diagnosis required",
                text: "Please enter diagnosis.",
            });
            return;
        }

        if (existingRecordId) {
            Swal.fire({
                icon: "info",
                title: "Medical record already exists",
                text: "Fields are filled from existing record. Update API can be connected later.",
                confirmButtonColor: "#2f80ed",
            });
            return;
        }

        try {
            setLoading(true);

            const filteredMedications = medications.filter(
                (med) =>
                    med.medicineName ||
                    med.dosage ||
                    med.frequency ||
                    med.timeSchedule ||
                    med.startDate ||
                    med.endDate ||
                    med.instruction
            );

            const requestData = {
                appointmentId: appointmentId,
                diagnosis: diagnosis,
                notes: notes,
                medications: filteredMedications,
            };

            const response = await createMedicalRecord(requestData, testReports);

            if (response.data?.status === true) {
                await Swal.fire({
                    icon: "success",
                    title: "Consultation Created",
                    text: response.data?.message || "Medical record created successfully.",
                    confirmButtonColor: "#2f80ed",
                });

                navigate("/dashboard/doctor/schedule-list");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed",
                    text: response.data?.message || "Failed to create medical record.",
                });
            }
        } catch (error) {
            console.error("Create consultation error:", error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    error.response?.data?.message ||
                    "Something went wrong while creating consultation.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="consultation-page">
            <SideBar />

            <div className="consultation-main">
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

                <div className="consultation-content">
                    <div className="consultation-header">
                        <h2>{existingRecordId ? "Medical Record" : "Create Consultation"}</h2>
                        <p>
                            {existingRecordId
                                ? "Existing medical record data is loaded below."
                                : "Create medical record, add diagnosis, notes, reports and medication."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="consultation-card">
                        <div className="consultation-section">
                            <h3>Medical Record</h3>

                            <div className="consultation-form-group">
                                <label>Patient Name</label>
                                <input type="text" value={patientName} readOnly />
                            </div>

                            <div className="consultation-form-group">
                                <label>Diagnosis</label>
                                <textarea
                                    placeholder="Enter diagnosis..."
                                    value={diagnosis}
                                    onChange={(e) => setDiagnosis(e.target.value)}
                                />
                            </div>

                            <div className="consultation-form-group">
                                <label>Notes</label>
                                <textarea
                                    placeholder="Enter doctor notes..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>

                            <div className="consultation-form-group">
                                <label>Test Reports</label>

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleTestReportChange}
                                />

                                {testReportPreviews.length > 0 && (
                                    <div className="test-report-preview-grid">
                                        {testReportPreviews.map((preview, index) => (
                                            <div className="test-report-preview-card" key={index}>
                                                <button
                                                    type="button"
                                                    className="remove-report-preview-btn"
                                                    onClick={() => removeTestReport(index)}
                                                >
                                                    ×
                                                </button>

                                                <img
                                                    src={preview.url}
                                                    alt={preview.name}
                                                    className="test-report-preview-img"
                                                />

                                                <p>{preview.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="consultation-section">
                            <div className="medication-title-row">
                                <div>
                                    <h3>Medication</h3>
                                    <p>Add prescribed medicines for this consultation.</p>
                                </div>

                                <button
                                    type="button"
                                    className="add-medication-btn"
                                    onClick={addMedication}
                                >
                                    + Add Medication
                                </button>
                            </div>

                            {medications.map((medication, index) => (
                                <div className="medication-card" key={index}>
                                    <div className="medication-card-header">
                                        <h4>Medication {index + 1}</h4>

                                        {medications.length > 1 && (
                                            <button
                                                type="button"
                                                className="remove-medication-btn"
                                                onClick={() => removeMedication(index)}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>

                                    <div className="medication-grid">
                                        <div className="consultation-form-group">
                                            <label>Medicine Name</label>
                                            <input
                                                type="text"
                                                name="medicineName"
                                                placeholder="Paracetamol"
                                                value={medication.medicineName}
                                                onChange={(e) => handleMedicationChange(index, e)}
                                            />
                                        </div>

                                        <div className="consultation-form-group">
                                            <label>Dosage</label>
                                            <input
                                                type="text"
                                                name="dosage"
                                                placeholder="500mg"
                                                value={medication.dosage}
                                                onChange={(e) => handleMedicationChange(index, e)}
                                            />
                                        </div>

                                        <div className="consultation-form-group">
                                            <label>Frequency</label>
                                            <select
                                                name="frequency"
                                                value={medication.frequency}
                                                onChange={(e) => handleMedicationChange(index, e)}
                                            >
                                                <option value="">Select Frequency</option>
                                                {frequencyOptions.map((frequency) => (
                                                    <option key={frequency} value={frequency}>
                                                        {frequency}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="consultation-form-group">
                                            <label>Time Schedule</label>
                                            <input
                                                type="text"
                                                name="timeSchedule"
                                                placeholder="Morning and Evening"
                                                value={medication.timeSchedule}
                                                onChange={(e) => handleMedicationChange(index, e)}
                                            />
                                        </div>

                                        <div className="consultation-form-group">
                                            <label>Start Date</label>
                                            <input
                                                type="date"
                                                name="startDate"
                                                value={medication.startDate}
                                                onChange={(e) => handleMedicationChange(index, e)}
                                            />
                                        </div>

                                        <div className="consultation-form-group">
                                            <label>End Date</label>
                                            <input
                                                type="date"
                                                name="endDate"
                                                value={medication.endDate}
                                                onChange={(e) => handleMedicationChange(index, e)}
                                            />
                                        </div>

                                        <div className="consultation-form-group">
                                            <label>Status</label>
                                            <select
                                                name="status"
                                                value={medication.status}
                                                onChange={(e) => handleMedicationChange(index, e)}
                                            >
                                                {statusOptions.map((status) => (
                                                    <option key={status} value={status}>
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="consultation-form-group full-width">
                                            <label>Instruction</label>
                                            <textarea
                                                name="instruction"
                                                placeholder="Take after food..."
                                                value={medication.instruction}
                                                onChange={(e) => handleMedicationChange(index, e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="consultation-actions">
                            <button
                                type="button"
                                className="consultation-cancel-btn"
                                onClick={() => navigate("/dashboard/doctor/schedule-list")}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="consultation-submit-btn"
                                disabled={loading}
                            >
                                {loading ? "Creating..." : existingRecordId ? "Record Already Created" : "Create Consultation"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateMedicalRecord;