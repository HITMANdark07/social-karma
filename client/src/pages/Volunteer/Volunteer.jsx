import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../MainNavbar/MainNavbar";
import Sidebar from "../Sidebar/Sidebar";

export const Volunteer = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user && !token) {
      navigate("/");
    }
  }, [user, token,navigate]);
  return (
    <div>
      <Sidebar active="volunteer" />
      <MainNavbar />
      <div style={{marginTop:100, textAlign:'center', fontSize:20}}>
        <h1>You will be assigned some tasks sortly</h1>
      </div>
    </div>
  );
};
