import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { auth, provider } from '../../firebase';

export default function Modal() {
  const dispatch = useDispatch();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [email, setEmail] = useState('');
  const [mailError, setMailError] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const history = useHistory();

  const hideLoginModal = () => {
    dispatch({ type: 'HIDE_LOGIN_MODAL' });
  };

  const onChange = (e) => {
    let { value, name } = e.target;
    switch (name) {
      case 'email': {
        setEmail(value);
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(value).toLowerCase())) {
          setIsEmailValid(true);
        } else {
          setIsEmailValid(false);
        }
        break;
      }
      case 'password': {
        setPassword(value);
        if (value.length < 8) {
          setIsPasswordValid(false);
        } else {
          setIsPasswordValid(true);
        }
        break;
      }
    }
  };

  const handleBlur = (e) => {
    let { name } = e.target;
    switch (name) {
      case 'email': {
        if (isEmailValid) {
          setMailError(false);
        } else {
          setMailError(true);
        }
        break;
      }

      case 'password': {
        if (isPasswordValid) {
          setPasswordError(false);
        } else {
          setPasswordError(true);
        }
        break;
      }
    }
  };

  const handleGoogleLogin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        hideLoginModal();
      })
      .catch((err) => {});
  };

  const signIn = () => {
    let url = 'http://localhost:5000/api/v1'
    if (process.env.NODE_ENV === 'production') {
      url = '/api/v1'
    }
    axios({
      // url: 'http://localhost:5000/api/v1/auth/login',
      url: url + '/auth/login',
      method: 'POST',
      data: { email, password },
    }).then(
      ({
        data: {
          token,
          user: { name, email, role },
        },
      }) => {
        localStorage.setItem('token', token);
        if (role === 'admin') history.replace('/dashboard');
        dispatch({
          type: 'SIGN_IN',
          payload: {
            userName: name,
            userEmail: email,
            role: role,
          },
        });
        hideLoginModal();
      }
    );
    // auth.signInWithEmailAndPassword(email, password).then((res)=>{
    //   let myEmail = res.user.email;
    //   let userName = myEmail.slice(0,myEmail.indexOf('@'));
    //   setShowLogin(false);
    //   // dispatch(
    //   //   {type:'SIGN_IN',payload:{
    //   //     userName: result.user.displayName,
    //   //     userEmail:result.user.email,
    //   //   }}
    //   // )
    // }).catch((error)=>{

    //   switch(error.code) {
    //     case "auth/user-not-found":
    //       {
    //         setLoginError('User not found');
    //         break;
    //       }
    //       default:{
    //         setLoginError('Something went wrong');
    //       }
    //       setEmail('');
    //       setPassword('');
    //   }
    // })
  };

  return (
    <>
      <div className="w-full h-full fixed z-30 ">
        <div
          className=" bg-black opacity-75 w-full h-full	absolute z-30 "
          onClick={hideLoginModal}
        />
        <div className="bg-white rounded-md md:max-w-md md:mx-auto  px-6 pb-6 fixed inset-x-0 bottom-0 z-50 mb-4 md:relative forLoginScreen:h-full">
          <div className="mt-80px flex justify-between items-center forLoginScreen:mt-20px">
            <h1 className="mt-4 text-30 text-heading font-okra">Log in</h1>

            <div className="cursor-pointer">
              <svg
                onClick={hideLoginModal}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <div
            className={` ${
              loginError ? 'block' : 'hidden'
            } mt-2 h-10 text-center bg-red-200 text-red text-12 flex justify-center items-center font-barlow rounded`}
          >
            <span className="text-sm">{loginError}</span>
          </div>

          <label htmlFor="email"></label>
          <input
            autoComplete="off"
            type="text"
            size="50%"
            value={email}
            onChange={(e) => {
              onChange(e);
              setMailError(false);
            }}
            onBlur={(e) => handleBlur(e)}
            className={`w-full h-12 border border-gray focus:${
              mailError ? '' : 'border-white'
            } rounded-md focus:outline-none focus:${
              mailError ? '' : 'ring-1 ring-green-600'
            } ${mailError ? 'border-red' : ''}  p-2 rounded-md mt-10`}
            type="text"
            id="email"
            placeholder="Email"
            name="email"
          ></input>

          <div className="h-6">
            <p className="text-10 text-red text-left">
              {mailError && 'Please enter a valid email'}
            </p>
          </div>

          <label id="password" htmlFor="password"></label>
          <input
            autoComplete="off"
            value={password}
            type="password"
            name="password"
            onBlur={(e) => handleBlur(e)}
            onChange={(e) => {
              onChange(e);
              setPasswordError(false);
            }}
            id="password"
            placeholder="Password"
            className={`p-3 w-full h-12 border border-gray focus:${
              passwordError ? '' : 'border-white'
            } rounded-md focus:outline-none focus:${
              passwordError ? '' : 'ring-1 ring-green-600'
            } ${passwordError ? 'border-red' : ''}`}
          ></input>
          <div className="h-6">
            <p className="text-10 text-red text-left">
              {passwordError && 'Please enter a valid password'}
            </p>
          </div>

          <button
            onClick={signIn}
            className={`mt-4 text-white mb-4 rounded-md w-full h-10 focus:outline-none bg-red-500`}
          >
            Sign in
          </button>

          {/* <div className="flex justify-between items-center">
            <div className="flex-2 h-px w-60 bg-gray-300"></div>
            <small className="flex-1 mx-4">OR</small>
            <div className="flex-2 h-px w-60 bg-gray-300"></div>
          </div>
          
          <button
            onClick={handleGoogleLogin}
            className=" text-lg	font-okra focus:outline-none text-heading mt-6 w-full h-12 border border-gray rounded-md flex justify-center items-center "
          >
            <svg
              className="ml-3 mr-3"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.87566 13.2946L4.10987 16.1534L1.31093 16.2126C0.474461 14.6611 0 12.886 0 10.9997C0 9.17565 0.443609 7.45552 1.22994 5.94092H1.23054L3.72238 6.39776L4.81396 8.87465C4.5855 9.54071 4.46097 10.2557 4.46097 10.9997C4.46106 11.8072 4.60732 12.5808 4.87566 13.2946Z"
                fill="#FBBB00"
              ></path>
              <path
                d="M21.8082 8.94507C21.9345 9.61048 22.0004 10.2977 22.0004 11C22.0004 11.7875 21.9176 12.5557 21.7598 13.2967C21.2243 15.8183 19.8252 18.0201 17.8869 19.5782L17.8863 19.5776L14.7477 19.4175L14.3035 16.6445C15.5896 15.8902 16.5947 14.7098 17.1242 13.2967H11.2422V8.94507H17.21H21.8082Z"
                fill="#518EF8"
              ></path>
              <path
                d="M17.8865 19.5778L17.8871 19.5784C16.002 21.0937 13.6073 22.0002 11.0006 22.0002C6.81152 22.0002 3.16945 19.6588 1.31152 16.2132L4.87625 13.2952C5.8052 15.7744 8.19679 17.5392 11.0006 17.5392C12.2057 17.5392 13.3348 17.2134 14.3036 16.6447L17.8865 19.5778Z"
                fill="#28B446"
              ></path>
              <path
                d="M18.0208 2.53241L14.4573 5.44981C13.4546 4.82307 12.2694 4.46102 10.9996 4.46102C8.13229 4.46102 5.69596 6.30682 4.81356 8.87494L1.23009 5.9412H1.22949C3.06022 2.41154 6.74823 0 10.9996 0C13.6686 0 16.1158 0.950726 18.0208 2.53241Z"
                fill="#F14336"
              ></path>
            </svg>
            Continue with Google
          </button> */}
          <div className="mt-6 mb-4 h-px w-full bg-gray-300"></div>
          <p>
            New to Chromato?{' '}
            <span
              onClick={() => {
                dispatch({ type: 'SHOW_SIGNUP_MODAL' });
              }}
              className="text-red cursor-pointer"
            >
              Create account
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
