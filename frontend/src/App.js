import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Pages */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/patient/Dashboard";
import Appointment from "./pages/patient/Appointment";
import MedicalRecords from "./pages/doctor/DoctorMedicalRecords";
import Contact from "./pages/common/Contact";
import Chat from "./pages/patient/Chat";
import Notifications from "./pages/common/Notifications";
import Feedback from "./pages/common/Feedback";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import HealthSection from "./pages/patient/HealthSection";
import PaymentHistory from "./pages/patient/PaymentHistory";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorPaymentHistory from "./pages/doctor/DoctorPaymentHistory";
import DoctorChat from "./pages/doctor/DoctorChat";
import DoctorPatientHealth from "./pages/doctor/DoctorPatientHealth";
import DoctorClinicAnalysis from "./pages/doctor/DoctorClinicAnalysis";
import PatientMedicalRecords from "./pages/patient/PatientMedicalRecords";
import DoctorPatientConsultation from "./pages/doctor/DoctorPatientConsultation";
import DoctorBill from "./pages/doctor/DoctorBill";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main App Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/health" element={<HealthSection />} />
        <Route path="/payments" element={<PaymentHistory />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} />
        <Route path="/doctor/payments" element={<DoctorPaymentHistory />} />
        <Route path="/doctor/chat" element={<DoctorChat />} />
        <Route path="/doctor/patient-health" element={<DoctorPatientHealth />} />
        <Route path="/doctor/analysis" element={<DoctorClinicAnalysis />}/>
        <Route path="/patient/medical-records" element={<PatientMedicalRecords />} />
        <Route path="/doctor/patient-consultation" element={<DoctorPatientConsultation />} />
        <Route path="/doctor/generate-bill" element={<DoctorBill />} />






      </Routes>
    </BrowserRouter>
  );
}

export default App;



