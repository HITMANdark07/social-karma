import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin } from '../../store/actions/user.action';
import GoogleLoginButton from '../../components/GoogleLogin/GoogleLoginButton';
import {Navigation} from '../Navbar/Navigation';
import JsonData from "../../Data/Data.json";
import SmoothScroll from "smooth-scroll";
import { Header } from '../Header/Header';
import { About } from '../About/About';
import { Contact } from '../Contact/Contact';
import { Features } from '../Features/Features'
import {Gallery } from '../Gallery/Gallery';
import { Image } from '../Image/Image';
import { Team } from '../Team/Team';
import {Services } from '../Services/Services';
import {Testimonials } from '../Testimonials/Testimonials';
import { Sidebar } from '../Sidebar/Sidebar';
import { MainNavbar } from '../MainNavbar/MainNavbar';
import { useNavigate } from 'react-router-dom';


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Home = () => {
    const [landingPageData, setLandingPageData] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);

    const dispatch = useDispatch();
    const {user, token} = useSelector(state => state.user);
    const subRole  = user?.subRole;
    useEffect(() => {
        if(user && token && subRole==='donator'){
            navigate('/dashboard')
        }else if(user && token && subRole==='volunteer'){
            navigate('/volunteer');
        }
    },[user, token, navigate]);
    

    return(
        <div>
            <Navigation />
            <Header data={landingPageData.Header} />
            <Features data={landingPageData.Features} />
            <About data={landingPageData.About} />
            {/* <Services data={landingPageData.Services} /> */}
            <Gallery data={landingPageData.Gallery}/>
            <Testimonials data={landingPageData.Testimonials} />
            {/* <Team data={landingPageData.Team} /> */}
            <Contact data={landingPageData.Contact} />
        </div>
    )
};

export default Home;