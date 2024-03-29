import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import { CodeVerification } from "../../interface/request/Authorization/CodeVerification";
import {PhoneVerification} from "../../interface/request/Authorization/PhoneVerification";
import {useDispatch} from "react-redux";
import {storeFunction} from "../../stores/slices/functionSlice";
import {AuthorizationService} from "../../service/Authorization/AuthorizationService";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);

  const registration = async () => {
    const verifyRequest: CodeVerification = {
      phone: phone,
      otp_type: 3,
    };

      AuthorizationService.send(verifyRequest)
      .then((data) => {
        console.log('Code is: ', data.data.data.code);
        dispatch(storeFunction(passwordChange))
        navigate('/verification');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const passwordChange = async (phoneCode: string ) => {
    const verificationRequest: PhoneVerification = {
      phone: phone,
      code: phoneCode,
      otp_type: 3,
    };
    let token = '';
    await AuthorizationService.verify(verificationRequest)
        .then((data) => {
          token = data.data.data.token;
          console.log(token);
          navigate('/change-pass')
          dispatch(storeFunction(updatePassword(token, phone)))
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  const updatePassword = (token: string, phone: string) => {
    return {token, phone}
  }


  return (
    <>
      <div className="h-screen flex items-center justify-center flex-col  bg-gradient-to-r from-pink-100 via-purple-100 to-gray-100 w-full font-abel">
        <div className="w-[500px] h-[500px] flex flex-col justify-center items-center p-[15px]">
          <div className="text-3xl font-bold self-start">
            Forgot your password?
          </div>
          <div className="text-2xl">
            Please enter your phone number to sign in NU event.
          </div>
          {error && (
            <p className="text-4xl text-red-500 mt-2">
              Account with this phone number does not exist.
            </p>
          )}
          <InputMask
            mask="+7(999) 999-99-99"
            maskChar=""
            type="text"
            placeholder="+7(999)999 99 99"
            value={phone}
            onChange={(event) => {
              const numericValue = event.target.value.replace(/[\D\s]/g, "");
              setPhone(numericValue);
              if (error) {
                setError(false);
              }
            }}
            className={`w-[300px] h-[40px] border-2 solid ${
              error ? "border-red-500" : "border-bor-in"
            } rounded-xl pl-1 text-xl mb-4`}
            required
          />
          <button  type="button" className=" w-[350px] h-[40px] mb-[10px] bg-dark-blue text-center text-white rounded-xl flex justify-center items-center" onClick={registration}>
            Request password reset
          </button>
          <div className="text-center">
            Already have an accound? <Link to="/sign-in">Sign In</Link>
          </div>
        </div>
      </div>
    </>
  );
}
