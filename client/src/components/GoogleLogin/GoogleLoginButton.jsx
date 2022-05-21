import React from 'react';
import GoogleLogin from 'react-google-login';
import { ImGooglePlus2 } from 'react-icons/im';
import { toast } from 'react-toastify';

const GoogleLoginButton = ({informParent = f => f}) => {

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
                clientId={'262648801792-mjlbfg3cb1kqdq7nlrdeaarq1obgca54.apps.googleusercontent.com'}
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