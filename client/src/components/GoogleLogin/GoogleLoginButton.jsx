import React from 'react';
import GoogleLogin from 'react-google-login';
import { ImGooglePlus2 } from 'react-icons/im';

const GoogleLoginButton = ({informParent = f => f}) => {

    const responseGoogle = (response) => {
        console.log(response);
        informParent(response.tokenId);
    };
    return(
        <div className="pb-3">
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={renderProps => (
                    <button className="flex justify-center items-center rounded text-white w-70 p-2" style={{
                        backgroundColor: '#DB4437ff',
                      }} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                     <ImGooglePlus2 style={{marginRight:10}} size={25} />  LOGIN WITH GOOGLE+
                    </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default GoogleLoginButton;