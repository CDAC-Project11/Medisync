const PATIENT_BASE = "http://localhost:8081";

export async function getMyProfile() {
  const token = sessionStorage.getItem("token");

  const res = await fetch("http://localhost:8081/patients/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}

