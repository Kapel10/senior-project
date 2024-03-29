import React, {useState} from "react"
import {useSelector} from "react-redux";
import {RootState} from "../../stores/store";
import {UpdatePasswordRequest} from "../../interface/request/Authorization/UpdatePasswordRequest";
import {useNavigate} from "react-router-dom";
import { AuthorizationService } from "../../service/Authorization/AuthorizationService";


const PasswordUpdate = () => {
    const navigate = useNavigate();
    const[details, setDetails] = useState({
        password: '',
        confirmPassword: ''
    });
    const handleFunction = useSelector((state:RootState) => state.functionStore.function)
    const changePassword = () => {
        const {token, phone} = handleFunction;
        const request: UpdatePasswordRequest = {
            token: token,
            new_password: details.password,
            confirm_password: details.confirmPassword,
            phone: phone
        }
        AuthorizationService.reset(request).then((data) =>{
                if(data.status === 200) navigate('/sign-in')
        })
    }
    return(
        <>
            <div
                className="h-screen flex items-center justify-center flex-col bg-gradient-to-r from-pink-100 via-purple-100 to-gray-100 w-full font-abel">
                <form className="w-[500px] h-[400px] text-center flex items-center justify-center flex-col">
                    <div className="relative w-[350px] h-[75px] mb-3 flex items-center mt-12">
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
                            value={details.password}
                            onChange={(event) => {
                                setDetails({...details, password: event.target.value});
                            }}
                            className={`w-full h-full border-2 solid border-bor-in rounded-xl pl-11 text-xl`}
                            required
                        />
                    </div>
                    <div className="relative w-[350px] h-[75px] flex items-center">
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
                            value={details.confirmPassword}
                            onChange={(event) => {
                                setDetails({...details, confirmPassword: event.target.value});

                            }}
                            className={`w-full h-full border-2 solid border-bor-in rounded-xl pl-11 text-xl`}
                            required
                        />
                    </div>
                    <div className="w-4/12 h-12 m-auto">
                        <button
                            type="button"
                            className=" w-full h-full bg-dark-blue text-center text-white rounded-xl flex justify-center items-center"
                            onClick={changePassword}
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default PasswordUpdate;