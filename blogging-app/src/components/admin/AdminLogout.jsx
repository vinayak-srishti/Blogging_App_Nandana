// src/components/Admin/AdminLogout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin-login");
  }, [navigate]);

  return null;
};

export default AdminLogout;
