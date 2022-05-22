import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WalletCard from "../../components/Cards/WalletCard";
import MainNavbar from "../MainNavbar/MainNavbar";
import Sidebar from "../Sidebar/Sidebar";
import styles from './wallet.module.css';

export const Wallet = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);

  const {wallet} = useSelector(state => state.wallet);
  const balance = wallet?.balance || 0;

  useEffect(() => {
    if (!user && !token) {
      navigate("/");
    }
  }, [user,token,navigate]);
  return (
    <div>
      <Sidebar active="wallet" />
      <MainNavbar  />
      <div className={styles.container}>
          <h2 className="p-5 font-bold">You will be getting Karma Points on completing tasks</h2>
          <WalletCard balance={balance} />
      </div>
    </div>
  );
};
