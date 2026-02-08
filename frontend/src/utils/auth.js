import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
  const token = sessionStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    return {
      token,
      role: decoded.role,
      email: decoded.sub
    };

  } catch (err) {
    return null;
  }
};
