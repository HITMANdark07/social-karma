import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin } from '../../store/actions/user.action';
import GoogleLoginButton from '../../components/GoogleLogin/GoogleLoginButton';

const Home =() => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    console.log(user);

    const responseGoogle = (tokenId, profileObj) => {
        const sendData = {
            name: profileObj.givenName+" "+profileObj.familyName,
            email: profileObj.email,
            photo: profileObj.imageUrl,
            idToken:tokenId
        }
        dispatch(googleLogin(sendData));
    }

    return(
        <div>
            <h1 className='font-bold'>HOMEPAGE</h1>
            <GoogleLoginButton informParent={responseGoogle} />
        </div>
    )
};

export default Home;