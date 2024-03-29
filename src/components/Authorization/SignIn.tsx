import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthorizationDtoRequest } from "../../interface/request/Authorization/AuthorizationDtoRequest";
import { LocalStorageUtil } from "../../utils/LocalStorageUtil";
import { AuthorizationDtoResponse } from "../../interface/response/Authorization/AuthorizationDtoResponse";
import InputMask from "react-input-mask";
import {AuthorizationService} from "../../service/Authorization/AuthorizationService";

export default function SignIn() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [login, setLogin] = useState<AuthorizationDtoRequest>({
    phone: '',
    password: '',
  });

  const [error, setError] = useState(false);

  const authorization = () => {
    const request: AuthorizationDtoRequest = {
      phone: login.phone,
      password: login.password,
    };

    AuthorizationService.authorization(request)
      .then(({ data }) => {
        const response: AuthorizationDtoResponse = data;
        console.log(response)
        LocalStorageUtil.setJWTToken(response.data.tokens.access_token);
        LocalStorageUtil.setRefreshToken(response.data.tokens.refresh_token);
        navigate('/home');
      })
      .catch(function (error) {
        console.log(error);
        setError(true);
      });
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col bg-gradient-to-r from-pink-100 via-purple-100 to-gray-100 w-full font-abel">
      <div className="relative pb-10">
        <div className="font-[1000] text-center flex items-center">
          <div className="text-8xl text-text-col">NU</div>
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
      <form className="w-[500px] h-[500px] text-center relative mb-24">
        <div className="text-center text-3xl mb-4">Sign In</div>
        {error && (
          <p style={{ color: "red" }} className="text-xl mb-1">
            Incorrect credentials. Please try again.
          </p>
        )}

        <div className="relative w-[350px] h-[75px] mx-auto mb-4 flex items-center">
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
            value={login.phone}
            onChange={(event) => {
              const numericValue = event.target.value.replace(/[\D\s]/g, "");
              setLogin({ ...login, phone: numericValue });
              if (error) {
                setError(false);
              }
            }}
            className={`w-full h-full border-2 solid ${
              error ? "border-red-500" : "border-bor-in"
            } rounded-xl pl-11 text-xl`}
            required
          />
        </div>
        <div className="relative w-[350px] h-[75px] m-auto flex items-center justify-end">
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
          <div
            className="w-1/12 h-2/6 absolute right-3"
            onClick={() => {
              setIsPasswordVisible(!isPasswordVisible);
            }}
          >
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
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          </div>

          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Your password"
            value={login.password}
            onChange={(event) => {
              setLogin({ ...login, password: event.target.value });
              if (error) {
                setError(false);
              }
            }}
            className={`w-full h-full border-2 solid ${
              error ? "border-red-500" : "border-bor-in"
            }  rounded-xl pl-11 text-xl`}
            required
          />
        </div>

        <div
          className="w-[350px] flex justify-end mb-4 mt-2 ml-[75px]"
          onClick={() => {
            navigate("/forgot-pass");
          }}
        >
          Forgot Password?
        </div>

        <div className="w-[320px] h-[50px] m-auto mb-4">
          <button
            type="button"
            className={`w-full h-full bg-dark-blue text-center text-white rounded-xl flex justify-center items-center`}
            disabled={login.phone.length < 11 || login.password.length < 1}
            onClick={() => {
              authorization();
            }}
          >
            SIGN IN
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 absolute ml-[100px] top-[282px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </button>
        </div>

        <p className="mb-2">OR</p>

        <div className="m-auto w-[320px] h-[50px]">
          <button className="w-full h-full text-center bg-white text-dark rounded-xl flex items-center justify-center ">
            <svg
              className="w-6 h-6 relative right-4"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.0005 5.02721C14.8632 4.99855 16.6646 5.69251 18.0267 6.96346L21.6955 3.37596C19.3417 1.17039 16.2259 -0.0390273 13.0005 0.000960935C10.5905 0.000404079 8.22797 0.670256 6.17696 1.93561C4.12596 3.20096 2.46738 5.01192 1.38672 7.16596L5.59047 10.4297C6.10448 8.86678 7.09614 7.50463 8.42559 6.53535C9.75505 5.56607 11.3552 5.03856 13.0005 5.02721Z"
                fill="#E43E2B"
              />
              <path
                d="M25.48 13.2901C25.4953 12.3964 25.403 11.5042 25.205 10.6326H13V15.4576H20.165C20.0291 16.3035 19.7235 17.1132 19.2666 17.838C18.8097 18.5628 18.2109 19.1877 17.5062 19.6751L21.6087 22.8526C22.8873 21.6182 23.8928 20.1293 24.5602 18.4822C25.2277 16.8351 25.5423 15.0663 25.4837 13.2901H25.48Z"
                fill="#3B7DED"
              />
              <path
                d="M5.60543 15.5715C5.3212 14.7439 5.17467 13.8753 5.17168 13.0003C5.17686 12.1267 5.31814 11.2592 5.59043 10.429L1.38668 7.16528C0.47492 8.97545 0 10.9741 0 13.0009C0 15.0277 0.47492 17.0264 1.38668 18.8365L5.60543 15.5715Z"
                fill="#F0B501"
              />
              <path
                d="M13.0004 26.0008C16.167 26.0903 19.2476 24.9635 21.6091 22.852L17.5066 19.6745C16.1764 20.5663 14.6011 21.0207 13.0004 20.9745C11.3565 20.9647 9.7575 20.4376 8.43013 19.4679C7.10275 18.4982 6.11443 17.1351 5.60536 15.572L1.40161 18.837C2.47936 20.9901 4.13522 22.8006 6.18375 24.0659C8.23229 25.3311 10.5926 26.0011 13.0004 26.0008Z"
                fill="#2BA24C"
              />
            </svg>
            Login with Google
          </button>
        </div>
        <div className="relative top-[150px]">
          Don't have an account? <Link to="/sign-up">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
