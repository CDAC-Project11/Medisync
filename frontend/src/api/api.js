import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080"
});

// ✅ Attach JWT only for protected endpoints
API.interceptors.request.use((req) => {

  // 🚫 Skip auth endpoints
  if (req.url && req.url.startsWith("/auth/")) {
    return req;
  }

  let token = sessionStorage.getItem("token");

  if (token) {
    token = token
      .replace(/^"+|"+$/g, "")
      .replace(/^Bearer\s+/i, "")
      .trim();

    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


// ✅ LOGIN — backend already returns JSON { token, role }
export const login = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  return res.data;
};

export default API;
