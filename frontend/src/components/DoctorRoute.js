import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function DoctorRoute({ children }) {
  const token = sessionStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    return decoded.role === "DOCTOR"
      ? children
      : <Navigate to="/dashboard" replace />;
  } catch {
    return <Navigate to="/login" replace />;
  }
}

export default DoctorRoute;
