import React from "react";
import {ChevronLeftIcon, GoogleIcon, PhoneIcon, XMarkIcon} from "../../Icons/Icons";
import InputMask from "react-input-mask";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../stores/store";
import {setId, setPassword, setPhone} from "../../stores/slices/AuthorizationSignInSlice";
import {AuthorizationDtoRequest} from "../../interface/request/Authorization/AuthorizationDtoRequest";
import {convertPhoneNumber} from "../../utils/TimeUtil";
import {AuthorizationService} from "../../service/Authorization/AuthorizationService";
import {LocalStorageUtil} from "../../utils/LocalStorageUtil";
import {useNavigate} from "react-router-dom";
import {setIdSignUp} from "../../stores/slices/AuthorizationSignUpSlice";
import {
    setIdUser,
    setUserFirstName,
    setUserLastName,
    setUserProfileImage,
    setUserUsername
} from "../../stores/slices/UserSlice";

const SignIn = () => {

    const id = useSelector((state: RootState) => state.AuthorizationSignInSlice.id);
    const dispatch = useDispatch();

    const SignInPage = () => {
        switch (id) {
            case 1:
                return <WelcomeModal/>
            case 2:
                return <ModalPhone/>
            case 3:
                return <ModalPassword/>
            default:
                return <></>
        }
    }

    return (
        <>
            <button className='font-inter' onClick={() => {
                if (id === 1) {
                    dispatch(setId(0));
                } else {
                    dispatch(setId(1));
                }
            }}>
                Sign in
            </button>
            <SignInPage/>
        </>
    );
}

export default SignIn;

const WelcomeModal = () => {

    const dispatch = useDispatch();

    return (
        <>
            <div className='fixed inset-0 z-50 overflow-auto bg-white bg-opacity-60'>
                <div
                    className='fixed shadow-2xl left-[380px] top-[50px] h-[600px] right-[380px] bg-white'>
                    <div className='absolute right-3 top-3' onClick={() => dispatch(setId(0))}><XMarkIcon/></div>
                    <div className='flex flex-col items-center gap-y-10 h-[400px] justify-center mt-[75px]'>
                        <div className='text-4xl mb-[20px]'>Welcome Back.</div>
                        <div
                            className='border-[1px] text-xl border-solid border-black rounded-[23px] w-[400px] h-[55px]'>
                            <div className='fixed h-[55px] w-[55px] flex items-center justify-center'><GoogleIcon/>
                            </div>
                            <div className='flex items-center justify-center w-full h-full'>
                                Sign in with Google
                            </div>
                        </div>
                        <div
                            className='border-[1px] text-xl border-solid border-black rounded-[23px] w-[400px] h-[55px]'
                        >
                            <div className='fixed h-[55px] w-[55px] flex items-center justify-center'>
                                <div className='h-[30px] w-[30px]'><PhoneIcon/></div>
                            </div>
                            <div className='flex items-center justify-center w-full h-full'
                                 onClick={() => dispatch(setId(2))}>
                                Sign in with Phone number
                            </div>
                        </div>
                        <div>No account? <span className='text-green-900 text-xl' onClick={() => {
                            dispatch(setId(0));
                            dispatch(setIdSignUp(1));
                        }}>Create one</span></div>
                    </div>
                </div>
            </div>

        </>

    )
}

const ModalPhone = () => {

    const phone = useSelector((state: RootState) => state.AuthorizationSignInSlice.phone);
    const dispatch = useDispatch();

    return (
        <>
            <div className='fixed inset-0 z-50 overflow-auto bg-white bg-opacity-60'>
                <div className='fixed bg-white shadow-2xl left-[380px] top-[50px] h-[600px] right-[380px]'>
                    <div className='absolute right-3 top-3' onClick={() => dispatch(setId(0))}><XMarkIcon/></div>
                    <div className='flex flex-col items-center gap-y-8 h-[400px] justify-center mt-[100px]'>
                        <div className='text-4xl '>Sign in with Phone Number</div>
                        <div className='text-xl'>
                            Enter the phone number associated with your account.
                        </div>
                        <div>Your phone number</div>
                        <InputMask
                            mask='+7(999) 999-99-99'
                            maskChar=''
                            type='text'
                            value={phone}
                            onChange={(event) => dispatch(setPhone(event.target.value))}
                            className={`border-b-[1px] border-black solid outline-none w-[210px] text-2xl font-light`}
                            required
                        />
                        <div
                            className='border-[1px] bg-black rounded-[25px] h-[45px] w-[200px] flex justify-center items-center mb-[10px]'
                            onClick={() => dispatch(setId(3))}>
                            <span className='text-white'>Continue</span>
                        </div>
                        <div className='text-green-700 flex text-lg justify-evenly items-center w-[180px]'
                             onClick={() => dispatch(setId(1))}>
                            <ChevronLeftIcon/> All sign in options
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

const ModalPassword = () => {
    const navigate = useNavigate();
    const password = useSelector((state: RootState) => state.AuthorizationSignInSlice.password);
    const phone = useSelector((state: RootState) => state.AuthorizationSignInSlice.phone);
    const dispatch = useDispatch();

    const Login = () => {
        const request: AuthorizationDtoRequest = {
            phone: convertPhoneNumber(phone),
            password: password
        }
        console.log(request);

        AuthorizationService.authorization(request).then((data) => {
            if (data.status === 200) {
                LocalStorageUtil.setRefreshToken(data.data.data.tokens.refresh_token);
                LocalStorageUtil.setJWTToken(data.data.data.tokens.access_token);
                console.log(data);

                dispatch(setIdUser(data.data.data.user.userId));
                dispatch(setUserUsername(data.data.data.user.username));
                dispatch(setUserFirstName(data.data.data.user.firstname));
                dispatch(setUserLastName(data.data.data.user.lastname));
                dispatch(setUserProfileImage(data.data.data.user.profileImage));
                navigate('/');
                dispatch(setId(0));
            }
        }).catch((error) => console.log(error))

    }

    return (
        <>
            <div className='fixed inset-0 z-50 overflow-auto bg-white bg-opacity-60'>
                <div className='fixed shadow-2xl bg-white left-[380px] top-[50px] h-[600px] right-[380px]'>
                    <div className='absolute right-3 top-3' onClick={() => dispatch(setId(0))}><XMarkIcon/></div>
                    <div className='flex flex-col items-center gap-y-8 h-[400px] justify-center mt-[75px]'>
                        <div className='text-4xl '>Sign in with Phone Number</div>
                        <div className='text-xl'>
                            Enter your Password
                        </div>
                        <div>Your password</div>
                        <input
                            type='password'
                            value={password}
                            onChange={(event) => dispatch(setPassword(event.target.value))}
                            className={`border-b-[1px] border-black solid outline-none w-[250px] text-2xl font-light text-center`}
                            required
                        />
                        <div onClick={Login}
                            className='border-[1px] bg-black rounded-[25px] h-[45px] w-[200px] flex justify-center items-center mb-[10px]'>
                            <span className='text-white' >Sign In</span>
                        </div>
                        <div className='text-green-700 flex text-lg justify-start items-center w-[120px] gap-x-1 '
                             onClick={() => dispatch(setId(2))}>
                            <ChevronLeftIcon/> Go back
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}