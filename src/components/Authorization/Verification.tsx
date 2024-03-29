import React, { useState } from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../stores/store";


export default function Verification() {
  const handleFunction = useSelector((state: RootState) => state.functionStore.function)
  console.log(handleFunction)

  const [phoneCode, setPhoneCode] = useState('');
  const [error, setError] = useState(false);

  return (
    <>
      <div className="h-screen  flex items-center justify-center flex-col  bg-gradient-to-r from-pink-100 via-purple-100 to-gray-100 w-full font-abel">
        <div className="text-center w-1/2  h-2/5">
          <div className="text-5xl mb-4">Verify Your number</div>
          <div className="text-3xl">
            Enter the 4 digit code we sent to your phone.
          </div>
          {error && (
            <p className="text-4xl text-red-500 mt-2">Wrong code! Try again.</p>
          )}
          <div className="w-full h-1/2 flex items-center justify-center ">
            <input
              className="w-2/12 h-3/6 mx-5 text-4xl pl-6 rounded-xl"
              type="text"
              maxLength={4}
              value={phoneCode}
              onChange={(event) => {
                setPhoneCode(event.target.value);
              }}
            />
          </div>
          <div className=" w-4/12 h-12 m-auto mb-4">
            <button
              type="button"
              className=" w-full h-full bg-dark-blue text-center text-white rounded-xl flex justify-center items-center"
              onClick={() => {handleFunction(phoneCode)}}
            >
              VERIFY
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
