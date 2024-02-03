import { FcGoogle } from 'react-icons/fc'
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@apollo/client";
import { SIGN_UP_GOOGLE } from "../queries"
import { ButtonLoader } from './common/ButtonLoader'
import { toast } from 'react-toastify'

export const Login = () => {
  const [signUpGoogle,{ data, loading }]= useMutation(SIGN_UP_GOOGLE);

if(data?.signUpGoogle?.success){
  window.location.href = ('/crypto-quotes')
}


const handleGoogleLogin = useGoogleLogin({
  onSuccess: tokenResponse => {
    const accessToken = tokenResponse.access_token
    if (accessToken) {
      signUpGoogle({
        variables:{ accessToken },
        onCompleted: (data) => {
          if(data?.signUpGoogle?.success) {
            localStorage.setItem('accessToken', data?.signUpGoogle?.accessToken)
            localStorage.setItem('refreshToken', data?.signUpGoogle?.refreshToken)
            toast.success('Welcome to Crypto Quotes')
          }
          if(!data?.signUpGoogle?.success) {
            toast.error('Login was not successful')
          }
        },
        onError: () => {
          toast.error('Login was not successful')
        },
      })
    }
  },
  onError: (error) => {
    toast.error('Login was not successful')
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