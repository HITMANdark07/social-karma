import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin } from '../../store/actions/user.action';
import GoogleLoginButton from '../../components/GoogleLogin/GoogleLoginButton';

const Home =() => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    console.log(user);

    const responseGoogle = (tokenId) => {
        // dispatch(googleLogin(tokenId));
        console.log(tokenId);
    }

    return(
        <div>
            <h1 className='font-bold'>HOMEPAGE</h1>
            <GoogleLoginButton informParent={responseGoogle} />
        </div>
    )
};

export default Home;