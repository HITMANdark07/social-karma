import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../MainNavbar/MainNavbar";
import Sidebar from "../Sidebar/Sidebar";
import moment from 'moment';
import styles from './donation.module.css';
import { getDonationsPerUser } from "../../store/actions/donation.action";

export const Donations = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user && !token) {
      navigate("/");
    }
    dispatch(getDonationsPerUser(user?._id));
  }, [user, token,navigate]);
  const {donations} = useSelector(state => state.donation);
  return (
    <div>
      <Sidebar active="donations" />
      <MainNavbar />
      <div className="flex flex-col items-start" style={{marginTop:100}}>
      {donations.map((donation) => (
        <div className={styles.container} style={{padding:5}}>
          <div className="font-bold">Donation ID: {donation._id}</div>
          <div className="text-red-700">Status: {donation.status}</div>
          <div className="font-italic">Food Desc: {donation.foodDesc}</div>
          <div className="font-italic">Food Weight: {donation.foodWeight} kg</div>
          <div className="font-bold">{moment(donation.createdAt).fromNow()}</div>
        </div>
      ))}
      </div>
    </div>
  );
};
