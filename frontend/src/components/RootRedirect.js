import { Navigate } from "react-router-dom";

function RootRedirect() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    return payload.role === "DOCTOR"
      ? <Navigate to="/doctor/dashboard" replace />
      : <Navigate to="/dashboard" replace />;
  } catch {
    sessionStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
}

export default RootRedirect;
