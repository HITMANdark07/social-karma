import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../MainNavbar/MainNavbar";
import Sidebar from "../Sidebar/Sidebar";
import style from "../Layout/Layout.module.css";
import { toast } from "react-toastify";
import api from "../../store/api";
import { getDonationsPerUser } from "../../store/actions/donation.action";

export const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [Food, setFood] = React.useState({
    donator:user?._id,
    foodWeight: "",
    location:{
      lat:"",
      lng:""
    },
    expectedExpiry: "",
    foodDesc: "",
    contact:""
  });
  const createDonation = async (data) => {
    setLoading(true);
    try {
      const { data:responseData } = await api.post(`/fooddonation/create`,data)

      if(responseData._id){
        setLoading(false);
        toast.success("Food Donation Submited");
        navigate('/donations');
        dispatch(getDonationsPerUser(user?._id));
      }  
    } catch (e) {
      toast.error(e?.response?.data?.message);
      setLoading(false)
    }
  }

  const getCurrentLocation = () =>{
    navigator.geolocation.getCurrentPosition((pos) =>{
      let location = {
        lat:pos.coords.latitude,
        lng:pos.coords.longitude
      }
      setFood((prevData) => ({
        ...prevData,
        location:location
      }));
    })
  }
  useEffect(() => {
    getCurrentLocation();
  },[]);

  const handleInputChange = (e) => {
    setFood((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const formHandler = (e) => {
    e.preventDefault();

    if (Food.foodWeight === "" || Food.expectedExpiry === "" || Food.foodDesc === "" || Food.contact ==="") {
      toast.warn("Please fill in all fields");
    } else {
      createDonation(Food);
    }
  };
  useEffect(() => {
    if (!user || !token) {
      navigate("/");
    }
  }, [user, token,navigate]);
  return (
    <div>
      <Sidebar active="dashboard" />
      <MainNavbar />
      <div className={style.container}>
        <form className={style.contact} action="" method="post" onSubmit={formHandler}>
          <h3>Donate Food</h3>
          <fieldset>
            <input
              placeholder="Amount of food(in Kg)"
              type="number"
              tabIndex="1"
              name="foodWeight"
              required
              autoFocus
              onChange={handleInputChange}
              value={Food.foodWeight}
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="Exipry Date"
              type="text"
              tabindex="3"
              required
              name="expectedExpiry"
              onFocus={(e) => (e.target.type = "datetime-local")}
              onBlur={(e) => (e.target.type = "text")}
              onChange={handleInputChange}
              value={Food.expectedExpiry}
            />
          </fieldset>
          <fieldset>
            <textarea
              placeholder="Food Description"
              tabindex="5"
              name="foodDesc"
              required
              onChange={handleInputChange}
              value={Food.foodDesc}
            ></textarea>
          </fieldset>
          <fieldset>
            <textarea
              placeholder="Contact Information"
              tabindex="5"
              name="contact"
              required
              onChange={handleInputChange}
              value={Food.contact}
            ></textarea>
          </fieldset>
          {Food.location.lat==="" && (
            <div className="text-red-600 font-bold">Please Allow location Access</div>
          )}
          <fieldset>
            <button
              name="submit"
              type="submit"
              id="contact-submit"
              data-submit="...Sending"
              disabled={Food.location.lat===""}
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
