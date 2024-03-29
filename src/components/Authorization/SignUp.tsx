import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CodeVerification } from "../../interface/request/Authorization/CodeVerification";
import { PhoneVerification } from "../../interface/request/Authorization/PhoneVerification";
import { RegistrationDtoRequest } from "../../interface/request/Authorization/RegistrationDtoRequest";
import InputMask from "react-input-mask";
import {useDispatch} from "react-redux";
import {storeFunction} from "../../stores/slices/functionSlice";
import {DatePicker} from 'antd'
import {LocalStorageUtil} from "../../utils/LocalStorageUtil";
import {AuthorizationDtoResponse} from "../../interface/response/Authorization/AuthorizationDtoResponse";
import {AuthorizationService} from "../../service/Authorization/AuthorizationService";



export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorRegistration, setErrorRegistration] = useState('');
  const [signUp, setSignUp] = useState({
    lastname: '',
    firstname: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const[imgProfile, setImgProfile] = useState<File | undefined>();

  const [date, setDate] = useState('');

  console.log(imgProfile)

  function handleImg(e: any) {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setImgProfile(selectedFile);
    }
  }
  const registration = () => {
    if (signUp.password !== signUp.confirmPassword) {
      setErrorRegistration('Passwords does not match!');
      return;
    }
    const verifyRequest: CodeVerification = {
      phone: signUp.phone,
      otp_type: 2,
    };
    AuthorizationService.send(verifyRequest)
      .then((data) => {
        dispatch(storeFunction(registrationVerification))
        console.log('Code is: ', data.data.data.code);
        navigate('/verification')
      })
      .catch(function (error) {
        console.log(error);
        setErrorRegistration('Phone number already registered!');
      });
  };

  const registrationVerification = async (phoneCode: string) => {
    const verificationRequest: PhoneVerification = {
      phone: signUp.phone,
      code: phoneCode,
      otp_type: 2,
    };
    let token = '';
    await AuthorizationService.verify(verificationRequest)
      .then((data) => {
        token = data.data.data.token;
        console.log(token);
      })
      .catch(function (error) {
        console.log(error);
      });

    const request: RegistrationDtoRequest = {
      token: token,
      phone: signUp.phone,
      password: signUp.password,
      confirm_password: signUp.confirmPassword,
    };
    console.log(request)
    await AuthorizationService.registration(request)
      .then(({data}) => {
        console.log(data)
        const response: AuthorizationDtoResponse = data;
        LocalStorageUtil.setJWTToken(response.data.tokens.access_token);
        LocalStorageUtil.setRefreshToken(response.data.tokens.refresh_token);
        if (data) {
          navigate('/category');
          dispatch(storeFunction(functionCategory(signUp.lastname, signUp.firstname, signUp.phone, date, imgProfile)))
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const functionCategory = (lastname: string, firstname: string, phone: string, date: string, img?: File) => {
    return {lastname, firstname, phone, date, img}
  }

  return (
    <div className="h-screen flex items-center justify-center flex-col bg-gradient-to-r from-pink-100 via-purple-100 to-gray-100 w-full font-abel">
      <div className="relative pb-10 mt-[30px] mb-[5px]">
        <div className="font-[1000] text-center flex items-center">
          <div className="text-8xl text-text-col"> NU</div>
          <svg
            className="w-20 h-20"
            viewBox="0 0 56 59"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M52.4647 34.9356L52.5796 34.9931C55.2515 36.4871 56.2858 39.8485 54.878 42.5491C49.9939 51.8863 40.1683 58.2644 28.8774 58.1782C13.1334 58.0633 0.233603 45.2497 0.00376275 29.5057C-0.254807 13.2445 12.8461 0 29.0785 0C38.2434 0 46.4314 4.25204 51.7464 10.8887L41.3462 16.5197C38.0135 13.2732 33.388 11.3196 28.3315 11.5207C19.0517 11.8942 11.5819 19.5651 11.467 28.8736C11.3521 38.6993 19.2816 46.6862 29.0498 46.6862C35.83 46.6862 41.7197 42.8651 44.6501 37.234C46.1441 34.4185 49.6779 33.3842 52.4647 34.9356Z"
              fill="#123499"
            />
            <path
              d="M54.9643 15.83C56.2571 18.3583 55.3378 21.4611 52.8383 22.8401L46.4602 26.3739L30.6587 35.1366C28.188 36.5156 25.0851 35.8261 23.4188 33.5277L23.3613 33.4415C21.379 30.7122 22.2408 26.8336 25.2288 25.2247L41.375 16.4908L51.7753 10.8597C52.9819 12.4112 54.0449 14.0775 54.9643 15.83Z"
              fill="#152238"
            />
          </svg>
          <div className="text-text-vents text-7xl mt-auto">vents</div>
        </div>
      </div>

      <form className="w-[500px] h-[400px] text-center mb-[250px]">
        <div className="text-center text-3xl mb-4">Sign Up</div>
        {errorRegistration.length > 1 && (
          <p style={{ color: "red" }}>{errorRegistration}</p>
        )}
        <div className="w-[350px] h-[75px] m-auto">
          <input type="file" onChange={handleImg} id='img' className='hidden'/>
          <div className='w-[350px] h-[40px] flex items-center justify-center'>
            {!imgProfile && <label htmlFor='img' className=''>
              <svg xmlns='http://www.w3.org/2000/svg' fill="none" viewBox='0 0 24 24' strokeWidth={1.5}
                   stroke="currentColor" className='w-8 h-8'>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
              </svg>
            </label> }
            {imgProfile && <>
              <img src={URL.createObjectURL(imgProfile)} alt='Image' className='w-8 h-8 rounded-lg'/>
            </>}
          </div>
          <div className="relative w-[350px] h-[75px] mb-3 flex items-center justify-end ">
            <div className="w-1/12 h-2/6 absolute left-2">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
            <input
                type="text"
                placeholder="Your name"
                value={signUp.firstname}
                onChange={(event) => {
                  setSignUp({...signUp, firstname: event.target.value});
                  if (errorRegistration.length > 1) {
                    setErrorRegistration('');
                  }
                }}
                className={`w-1/2 h-full border-2 solid border-bor-in rounded-xl pl-11 text-xl`}
                required
            />
            <input
                type="text"
                placeholder="Your lastname"
                value={signUp.lastname}
                onChange={(event) => {
                  setSignUp({...signUp, lastname: event.target.value});
                  if (errorRegistration.length > 1) {
                    setErrorRegistration('');
                  }
                }}
                className={`w-1/2 h-full border-2 solid border-bor-in rounded-xl pl-11 text-xl`}
                required
            />
          </div>

          <div className="relative w-[350px] h-[75px] mx-auto mb-3 flex items-center">
            <div className="w-1/12 h-2/6 absolute left-2">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-full h-full "
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
            </div>
            <InputMask
                mask="+7(999) 999-99-99"
                maskChar=""
                type="text"
                placeholder="+7(999)999 99 99"
                value={signUp.phone}
                onChange={(event) => {
                  const numericValue = event.target.value.replace(/[\D\s]/g, "");
                  setSignUp({...signUp, phone: numericValue});
                  if (errorRegistration.length > 1) {
                    setErrorRegistration('');
                  }
                }}
                className={`w-full h-full border-2 solid border-bor-in rounded-xl pl-11 text-xl`}
                required
            />
          </div>
          <div className="relative w-[350px] h-[75px] mb-3 flex items-center justify-end">
            <div className="w-1/12 h-2/6 absolute left-2">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-full h-full "
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <input
                type="password"
                placeholder="Your password"
                value={signUp.password}
                onChange={(event) => {
                  setSignUp({...signUp, password: event.target.value});
                  if (errorRegistration.length > 1) {
                    setErrorRegistration('');
                  }
                }}
                className={`w-full h-full border-2 solid border-bor-in rounded-xl pl-11 text-xl`}
                required
            />
          </div>
          <div className="relative w-[350px] h-[75px] mb-5 flex items-center justify-end">
            <div className="w-1/12 h-2/6 absolute left-2">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-full h-full "
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <input
                type="password"
                placeholder="Confirm password"
                value={signUp.confirmPassword}
                onChange={(event) => {
                  setSignUp({...signUp, confirmPassword: event.target.value});
                  if (errorRegistration.length > 1) {
                    setErrorRegistration('');
                  }
                }}
                className='w-full h-full border-2 solid border-bor-in rounded-xl pl-11 text-xl'
                required
            />
          </div>
          <DatePicker className='w-[350px] h-[40px] mb-5 text-2xl' onChange={(e) => {
            setDate(`${e?.year()}-${((e?.month() ?? 0) + 1).toString().padStart(2, '0')}-${(e?.date() ?? 0).toString().padStart(2, '0')}`)
          }} placeholder='Your birthday'/>

          <div className="w-3/4 h-12 m-auto mb-12">
            <button
                type="button"
                className=" w-full h-full bg-dark-blue text-center text-white rounded-xl flex justify-center items-center"
                onClick={registration}
                disabled={signUp.phone.length < 11 || signUp.password.length < 1 || signUp.firstname.length < 1 || signUp.lastname.length < 1 || signUp.confirmPassword.length < 1}
            >
              SIGN UP
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 absolute ml-48"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
          <div>
            Already have an accound? <Link to="/sign-in">Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
