import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@apollo/client";
import { SIGN_UP_GOOGLE } from "../queries"
import { ButtonLoader } from './common/ButtonLoader'

export const Login = () => {
  const [signUpGoogle,{ data, loading, error}]= useMutation(SIGN_UP_GOOGLE);
  const [accessToken, setAccessToken] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    if(accessToken){
      signUpGoogle({variables:{accessToken}})
      if(data && !error){
      //navigate user to profile
      navigate('/crypto-quotes')
      }
    }
},[accessToken, data, error, signUpGoogle, navigate])

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log('tokenResponse.access_token >>> ', tokenResponse.access_token)
      setAccessToken(tokenResponse.access_token)
    },
    onError: (error) => {
      console.log('Login Failed ', error);
    },
  })

  return (
    <>
      {
        loading ? <ButtonLoader /> : (
          <button
            className='button'
            onClick={() => handleGoogleLogin()}
            style={{ marginTop: '20px' }}
            >
              <div className='google-login-button'>
                <FcGoogle style={{fontSize:'2rem'}} />
                <span style={{fontSize:'1.1rem'}}>
                  Login with GMail
                </span>
              </div>
            </button>
        )
      }
    </>
  )
}