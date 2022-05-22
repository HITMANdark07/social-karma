import React from 'react';
import GoogleLogin from 'react-google-login';
import { ImGooglePlus2 } from 'react-icons/im';
import { toast } from 'react-toastify';

const GoogleLoginButton = ({text,informParent = f => f}) => {

    const responseGoogle = (response) => {
        if(response.error){
            toast.error(response.error);
        }else{
            informParent(response.tokenId, response.profileObj);
        }
    };
    return(
        <div className="pb-3">
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={renderProps => (
                    <button className="flex btn btn-custom btn-lg page-scroll" style={{
                        backgroundColor: '#DB4437ff',
                      }} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                     <ImGooglePlus2 style={{marginRight:10}} size={25} />  {text}
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