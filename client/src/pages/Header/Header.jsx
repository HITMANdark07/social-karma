import { useDispatch } from "react-redux"
import GoogleLoginButton from "../../components/GoogleLogin/GoogleLoginButton"
import { googleLogin } from "../../store/actions/user.action";

export const Header = (props) => {

  const dispatch = useDispatch();

  const responseGoogleAsVolunteer = (tokenId, profileObj) => {
    const sendData = {
        name: profileObj.givenName+" "+profileObj.familyName,
        email: profileObj.email,
        photo: profileObj.imageUrl,
        idToken:tokenId,
        subRole:'volunteer'
    }
    dispatch(googleLogin(sendData));
}
const responseGoogleAsDonator = (tokenId, profileObj) => {
    const sendData = {
        name: profileObj.givenName+" "+profileObj.familyName,
        email: profileObj.email,
        photo: profileObj.imageUrl,
        idToken:tokenId,
        subRole:'donator'
    }
    dispatch(googleLogin(sendData));
}
  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
                <div className="flex flex-row justify-evenly">
                <GoogleLoginButton text="Login As Volunteer" informParent={responseGoogleAsVolunteer} />
                <GoogleLoginButton text="Login As Donator" informParent={responseGoogleAsDonator} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
