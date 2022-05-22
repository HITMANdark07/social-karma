import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../MainNavbar/MainNavbar";
import Sidebar from "../Sidebar/Sidebar";

export const Layout = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);
  console.log(user, token);
  useEffect(() => {
    if (!user || !token) {
      navigate("/");
    }
  }, [user, token,navigate]);
  return (
    <div>
      <Sidebar active="dashboard" />
      <MainNavbar />
    </div>
  );
};
