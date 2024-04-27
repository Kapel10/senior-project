import React, {useEffect, useRef, useState} from 'react';
import {ChevronLeftIcon, GoogleIcon, PhoneIcon, XMarkIcon} from "../../Icons/Icons";
import InputMask from "react-input-mask";
import 'react-image-crop/dist/ReactCrop.css'
import {Crop} from "react-image-crop";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../stores/store";
import {Category} from "./Category/CategoryCard";
import CategoryList from "./Category/CategoryList";
import {CategoryService} from "../../service/Categories/CategoryService";
import default_image from "../../constant/images/user_avatar.jpeg"
import {
    setBirthDateSignUp, setCategoriesSignUp, setCodeSignUp,
    setConfirmPasswordSignUp, setFirstNameSignUp,
    setIdSignUp, setLastNameSignUp,
    setPasswordSignUp,
    setPhoneSignUp, setPhotoSignUp, setTokenSignUp, setUsernameSignUp
} from "../../stores/slices/AuthorizationSignUpSlice";
import {useNavigate} from "react-router-dom";
import {setId} from "../../stores/slices/AuthorizationSignInSlice";
import {CodeVerification} from "../../interface/request/Authorization/CodeVerification";
import {AuthorizationService} from "../../service/Authorization/AuthorizationService";
import {convertDateFormat, convertPhoneNumber} from "../../utils/TimeUtil";
import {PhoneVerification} from "../../interface/request/Authorization/PhoneVerification";
import {RegistrationDtoRequest} from "../../interface/request/Authorization/RegistrationDtoRequest";
import {LocalStorageUtil} from "../../utils/LocalStorageUtil";


export const SignUp = () => {
    const id = useSelector((state: RootState) => state.AuthorizationSignUpSlice.id);
    const dispatch = useDispatch();

    const SignUpPage = () => {
        switch (id) {
            case 1:
                return <WelcomeModal/>
            case 2:
                return <ModalPhone/>
            case 3:
                return <ModalCheckCode/>
            case 4:
                return <ModalPassword/>
            case 5:
                return <ModalConfirmPassword/>
            case 6:
                return <ModalUsername/>
            case 7:
                return <ModalBirthDate/>
            case 8:
                return <ModalCategories/>
            default:
                return <></>
        }
    }

    return (
        <>
            <button
                className='text-white bg-select-green w-[120px] h-[40px] rounded-[20px] flex justify-center items-center'
                onClick={() => {
                    if (id === 1) {
                        dispatch(setIdSignUp(0));
                    } else {
                        dispatch(setIdSignUp(1));
                    }
                }}>
                Get started
            </button>
            <SignUpPage/>
        </>
    )
}

export default SignUp;

const WelcomeModal = () => {
    const dispatch = useDispatch();

    return (
        <>
            <div className='fixed inset-0 z-50 overflow-auto bg-white bg-opacity-60'>
                <div className='fixed bg-white shadow-2xl left-[380px] top-[50px] h-[600px] right-[380px]'>
                    <div className='absolute right-3 top-3' onClick={() => dispatch(setIdSignUp(0))}><XMarkIcon/></div>
                    <div className='flex  flex-col items-center gap-y-10 h-[400px] justify-center mt-[75px]'>
                        <div className='text-4xl mb-[20px]'>Join Nu Events.</div>
                        <div
                            className='border-[1px] text-xl border-solid border-black rounded-[23px] w-[400px] h-[55px]'>
                            <div className='fixed h-[55px] w-[55px] flex items-center justify-center'><GoogleIcon/>
                            </div>
                            <div className='flex items-center justify-center w-full h-full'>
                                Sign up with Google
                            </div>
                        </div>
                        <div
                            className='border-[1px] text-xl border-solid border-black rounded-[23px] w-[400px] h-[55px]'
                        >
                            <div className='fixed h-[55px] w-[55px] flex items-center justify-center'>
                                <div className='h-[30px] w-[30px]'><PhoneIcon/></div>
                            </div>
                            <div
                                onClick={() => dispatch(setIdSignUp(2))}
                                className='flex items-center justify-center w-full h-full'>
                                Sign up with Phone number
                            </div>
                        </div>
                        <div>Already have an account? <span className='text-green-900 text-xl' onClick={() => {
                            dispatch(setIdSignUp(0));
                            dispatch(setId(1));
                        }}>Sign in</span></div>
                    </div>
                </div>
            </div>
        </>

    )
}

const ModalPhone = () => {
    const dispatch = useDispatch();
    const phone = useSelector((state: RootState) => state.AuthorizationSignUpSlice.phone);

    const handleRegistration = async () => {
        const request: CodeVerification = {
            phone: convertPhoneNumber(phone),
            otp_type: 2,
        }
        try {
            const response = await AuthorizationService.send(request);
            dispatch(setCodeSignUp(response.data.data.code));
            dispatch(setIdSignUp(3));
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <div className='fixed inset-0 z-50 overflow-auto bg-white bg-opacity-60'>
                <div className='fixed bg-white shadow-2xl left-[380px] top-[50px] h-[600px] right-[380px]'>
                    <div className='absolute right-3 top-3' onClick={() => dispatch(setIdSignUp(0))}><XMarkIcon/></div>
                    <div className='flex flex-col items-center gap-y-8 h-[400px] justify-center mt-[100px]'>
                        <div className='text-4xl '>Sign up with Phone Number</div>
                        <div className='text-xl'>
                            Enter your phone number to create an account.
                        </div>
                        <div>Your phone number</div>
                        <InputMask
                            mask='+7(999) 999-99-99'
                            maskChar=''
                            type='text'
                            value={phone}
                            onChange={(event) => dispatch(setPhoneSignUp(event.target.value))}
                            className={`border-b-[1px] border-black solid outline-none w-[210px] text-2xl font-light`}
                            required
                        />
                        <div
                            onClick={handleRegistration}
                            className='border-[1px] bg-black rounded-[25px] h-[45px] w-[200px] flex justify-center items-center mb-[10px]'>
                            <span className='text-white'>Continue</span>
                        </div>
                        <div
                            onClick={() => dispatch(setIdSignUp(1))}
                            className='text-green-700 flex text-lg justify-evenly items-center w-[180px]'>
                            <ChevronLeftIcon/> All sign in options
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

const ModalCheckCode = () => {
    const dispatch = useDispatch();
    const phone = useSelector((state: RootState) => state.AuthorizationSignUpSlice.phone);
    const code = useSelector((state: RootState) => state.AuthorizationSignUpSlice.code);
    const handleRegistration = async () => {
        const request: PhoneVerification = {
            phone: convertPhoneNumber(phone),
            otp_type: 2,
            code: code,
        }

        try {
            const response = await AuthorizationService.verify(request);
            dispatch(setTokenSignUp(response.data.data.token));
            dispatch(setIdSignUp(4));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='fixed inset-0 z-50 overflow-auto bg-white bg-opacity-60'>
                <div className='fixed shadow-2xl bg-white left-[380px] top-[50px] h-[600px] right-[380px]'>
                    <div className='absolute right-3 top-3' onClick={() => dispatch(setIdSignUp(0))}><XMarkIcon/></div>
                    <div className='flex flex-col items-center gap-y-8 h-[400px] justify-center mt-[100px]'>
                        <div className='text-4xl '>Check your phone notifications</div>
                        <div className='text-xl w-[300px] text-center'>
                            <p>Enter the code we sent to </p> +7(700) 177 31 39 to sign up.
                        </div>
                        <input
                            type='text'
                            className={`border-b-[1px] border-black solid text-center outline-none w-[110px] text-4xl font-light`}
                            required
                        />
                        <div
                            onClick={handleRegistration}
                            className='border-[1px] bg-black rounded-[25px] h-[45px] w-[200px] flex justify-center items-center mb-[10px]'>
                            <span className='text-white'>Continue</span>
                        </div>
                        <div
                            onClick={() => dispatch(setIdSignUp(2))}
                            className='text-green-700 flex text-lg justify-evenly items-center w-[240px]'>
                            <ChevronLeftIcon/> Change phone number
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

const ModalPassword = () => {
    const dispatch = useDispatch();
    const password = useSelector((state: RootState) => state.AuthorizationSignUpSlice.password);

    return (
        <>
            <div className='fixed inset-0 z-50 overflow-auto bg-white bg-opacity-60'>
                <div className='fixed bg-white shadow-2xl left-[380px] top-[50px] h-[600px] right-[380px]'>
                    <div className='absolute right-3 top-3' onClick={() => dispatch(setIdSignUp(0))}><XMarkIcon/></div>
                    <div className='flex flex-col items-center gap-y-8 h-[400px] justify-center mt-[75px]'>
                        <div className='text-4xl '>Sign up with Phone Number</div>
                        <div className='text-xl'>
                            Create a Password
                        </div>
                        <div>Your password</div>
                        <input
                            value={password}
                            onChange={(e) => dispatch(setPasswordSignUp(e.target.value))}
                            type='password'
                            className={`border-b-[1px] border-black solid outline-none w-[250px] text-2xl font-light text-center`}
                            required
                        />
                        <div
                            onClick={() => dispatch(setIdSignUp(5))}
                            className='border-[1px] bg-black rounded-[25px] h-[45px] w-[200px] flex justify-center items-center mb-[10px]'>
                            <span className='text-white'>Next</span>
                        </div>
                        <div
                            onClick={() => dispatch(setIdSignUp(3))}
                            className='text-green-700 flex text-lg justify-start items-center w-[120px] gap-x-1'>
                            <ChevronLeftIcon/> Go back
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

const ModalConfirmPassword = () => {
    const dispatch = useDispatch();
    const confirmPassword = useSelector((state: RootState) => state.AuthorizationSignUpSlice.confirmPassword);
    const phone = useSelector((state: RootState) => state.AuthorizationSignUpSlice.phone);
    const password = useSelector((state: RootState) => state.AuthorizationSignUpSlice.password);
    const token = useSelector((state: RootState) => state.AuthorizationSignUpSlice.token);

    const handleRegistration = async () => {

        const request: RegistrationDtoRequest = {
            phone: convertPhoneNumber(phone),
            password: password,
            token: token,
            confirm_password: confirmPassword,
        }
        try {
            const response = await AuthorizationService.registration(request);
            LocalStorageUtil.setRefreshToken(response.data.data.tokens.refresh_token);
            LocalStorageUtil.setJWTToken(response.data.data.tokens.access_token);
            dispatch(setIdSignUp(6))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='fixed inset-0 z-50 overflow-auto bg-white bg-opacity-60'>
                <div className='fixed shadow-2xl bg-white left-[380px] top-[50px] h-[600px] right-[380px]'>
                    <div className='absolute right-3 top-3' onClick={() => dispatch(setIdSignUp(0))}><XMarkIcon/></div>
                    <div className='flex flex-col items-center gap-y-8 h-[400px] justify-center mt-[75px]'>
                        <div className='text-4xl '>Sign up with Phone Number</div>
                        <div className='text-xl'>
                            Please, confirm your Password
                        </div>
                        <div>Your password</div>
                        <input
                            value={confirmPassword}
                            onChange={(e) => dispatch(setConfirmPasswordSignUp(e.target.value))}
                            type='password'
                            className={`border-b-[1px] border-black solid outline-none w-[250px] text-2xl font-light text-center`}
                            required
                        />
                        <div
                            onClick={handleRegistration}
                            className='border-[1px] bg-black rounded-[25px] h-[45px] w-[200px] flex justify-center items-center mb-[10px]'>
                            <span className='text-white'>Next</span>
                        </div>
                        <div
                            onClick={() => dispatch(setIdSignUp(4))}
                            className='text-green-700 flex text-lg justify-start items-center w-[120px] gap-x-1'>
                            <ChevronLeftIcon/> Go back
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export const ModalUsername = () => {
    const username = useSelector((state: RootState) => state.AuthorizationSignUpSlice.username);
    const user_photo = useSelector((state: RootState) => state.AuthorizationSignUpSlice.photo);
    const dispatch = useDispatch();
    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const [imgSrc, setImgSrc] = useState<string>('');

    const setDefaultImage = () => {
        const defaultImageUrl = default_image; // Provide the path to your default image
        setImgSrc(defaultImageUrl);
    };

    useEffect(() => {
        // Set default image when component mounts
        setDefaultImage();
    }, []);

    const handleImageUpload = (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageUrl = reader.result?.toString() || "";
            setImgSrc(imageUrl);
            dispatch(setPhotoSignUp(file));
        });
        reader.readAsDataURL(file);
    }

    const onImageLoad = (e: any) => {
        const {width, height} = e.currentTarget;

        // Calculate crop dimensions to center and make it 40x40 pixels
        const cropWidth = Math.min(width, height);
        const cropHeight = cropWidth;
        const cropX = (width - cropWidth) / 2;
        const cropY = (height - cropHeight) / 2;

        // Set the crop directly
        const crop: Crop = {
            height: cropHeight,
            unit: 'px',
            width: cropWidth,
            x: cropX,
            y: cropY
        };
        if (previewCanvasRef?.current && imgRef?.current) {
            setCanvasPreview1(previewCanvasRef.current, imgRef.current, crop);
        }

    }

    return (
        <>
            <div className='fixed inset-0 z-50 overflow-auto bg-white bg-opacity-60'>
                <div className='fixed left-[380px] top-[50px] h-[700px] right-[380px] bg-white shadow-2xl'>
                    <div className='absolute right-3 top-3' onClick={() => dispatch(setIdSignUp(0))}><XMarkIcon/></div>
                    <div className='flex flex-col items-center gap-y-8 h-[600px] justify-center mt-[50px]'>
                        <div className='text-4xl '>Sign up with Phone Number</div>
                        <label htmlFor="file-input" className='text-xl cursor-pointer'>
                            Your profile image
                        </label>
                        <input id="file-input" type='file' onChange={handleImageUpload} style={{display: 'none'}}/>
                        {imgSrc &&
                            <img
                                src={imgSrc}
                                alt='profile'
                                ref={imgRef}
                                onLoad={onImageLoad}
                                style={{display: 'none'}}
                            />}
                        <label htmlFor="file-input">
                            <canvas
                                ref={previewCanvasRef}
                                className='w-[100px] h-[100px] rounded-full border-[1px] solid border-black'
                            />
                        </label>

                        <div className='text-xl'>
                            Create Username
                        </div>
                        <div>Your username</div>
                        <input
                            value={username}
                            onChange={(e) => dispatch(setUsernameSignUp(e.target.value))}
                            type='text'
                            className={`border-b-[1px] border-black solid outline-none w-[250px] text-2xl font-light text-center`}
                            required
                        />
                        <div
                            onClick={() => dispatch(setIdSignUp(7))}
                            className='border-[1px] bg-black rounded-[25px] h-[45px] w-[200px] flex justify-center items-center mb-[10px]'>
                            <span className='text-white'>Next</span>
                        </div>
                        <div
                            onClick={() => dispatch(setIdSignUp(5))}
                            className='text-green-700 flex text-lg justify-start items-center w-[120px] gap-x-1'>
                            <ChevronLeftIcon/> Go back
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

const ModalBirthDate = () => {
    const birthDate = useSelector((state: RootState) => state.AuthorizationSignUpSlice.birthDate);
    const firstName = useSelector((state: RootState) => state.AuthorizationSignUpSlice.firstName);
    const lastName = useSelector((state: RootState) => state.AuthorizationSignUpSlice.lastName);
    const dispatch = useDispatch();

    return (
        <>
            <div className='fixed inset-0 z-50 overflow-auto bg-white bg-opacity-60'>
                <div className='fixed left-[380px] top-[50px] h-[700px] right-[380px] bg-white shadow-2xl '>
                    <div className='absolute right-3 top-3' onClick={() => dispatch(setIdSignUp(0))}><XMarkIcon/></div>
                    <div className='flex flex-col items-center gap-y-8 h-[600px] justify-center mt-[50px]'>
                        <div className='text-4xl '>Sign up with Phone Number</div>

                        <div>First Name</div>
                        <input
                            value={firstName}
                            onChange={(e) => dispatch(setFirstNameSignUp(e.target.value))}
                            type='text'
                            className={`border-b-[1px] border-black solid outline-none w-[250px] text-2xl font-light text-center`}
                            required
                        />
                        <div>Last Name</div>
                        <input
                            value={lastName}
                            onChange={(e) => dispatch(setLastNameSignUp(e.target.value))}
                            type='text'
                            className={`border-b-[1px] border-black solid outline-none w-[250px] text-2xl font-light text-center`}
                            required
                        />
                        <div>Your Birthday</div>
                        <InputMask
                            mask='99/99/9999'
                            maskChar=''
                            value={birthDate}
                            onChange={(e) => dispatch(setBirthDateSignUp(e.target.value))}
                            type='text'
                            className={`border-b-[1px] border-black solid outline-none w-[200px] text-2xl font-light text-center`}
                            required
                            placeholder={'DD/MM/YYYY'}
                        />
                        <div
                            onClick={() => dispatch(setIdSignUp(8))}
                            className='border-[1px] bg-black rounded-[25px] h-[45px] w-[200px] flex justify-center items-center mb-[10px]'>
                            <span className='text-white'>Next</span>
                        </div>
                        <div
                            onClick={() => dispatch(setIdSignUp(6))}
                            className='text-green-700 flex text-lg justify-start items-center w-[120px] gap-x-1'>
                            <ChevronLeftIcon/> Go back
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

const ModalCategories = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        CategoryService.getCategories()
            .then(data => {
                dispatch(setCategoriesSignUp(data.data.data.categories));
            })
            .catch(error => {
                dispatch(setCategoriesSignUp([]));
            });
    }, []);

    const arr = [6, 12, 18, 24, 30, 36];
    const selectedCategories = useSelector((state: RootState) => state.AuthorizationSignUpSlice.category);

    const handleSelectedCategories = (category: Category) => {
        if (selectedCategories.includes(category)) {
            const updatedCategories = selectedCategories.map(cat =>
                cat.id === category.id ? {...cat, active: !cat.active} : cat
            );
            dispatch(setCategoriesSignUp(updatedCategories));
        } else {
            const arr = [...selectedCategories, category];
            dispatch(setCategoriesSignUp(arr));
        }
    }

    const handleCategoryList = (initVal: number, finalVal: number, index: number) => {


        const categorySlice = selectedCategories.slice(initVal, finalVal);
        return (
            <div className='flex justify-center'>
                <CategoryList className={`flex justify-between w-full ${index % 2 === 0 ? 'ml-[30px]' : 'mr-[30px]'} `}
                              categoryCardClassName={`bg-gray-200 rounded-[15px] min-w-[20px] max-w-[800px] text-sm p-[10px] h-[25px] flex items-center justify-center`}
                              category_list={categorySlice} onSelectCategory={handleSelectedCategories}/>
            </div>
        )
    }

    return (
        <>
            <div className='fixed inset-0 z-50 overflow-auto bg-white bg-opacity-60'>
                <div className='fixed left-[380px] top-[50px] h-[600px] right-[380px] bg-white shadow-2xl'>
                    <div className='absolute right-3 top-3' onClick={() => dispatch(setIdSignUp(0))}><XMarkIcon/></div>
                    <div className='flex flex-col items-center gap-y-8 h-[550px] justify-center mt-[30px]'>
                        <div className='text-4xl '>Sign up with Phone Number</div>
                        <div className='text-xl'>
                            Select categories that you like
                        </div>
                        <div className='flex flex-col gap-5  w-[600px]'>
                            {arr.map((value, index) => handleCategoryList(value - 6, value, index))}
                        </div>
                        <HandleRegistration/>
                        <div
                            onClick={() => dispatch(setIdSignUp(7))}
                            className='text-green-700 flex text-lg justify-start items-center w-[120px] gap-x-1'>
                            <ChevronLeftIcon/> Go back
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const HandleRegistration = () => {
    const navigate = useNavigate();
    const selectedCategories = useSelector((state: RootState) => state.AuthorizationSignUpSlice.category);
    const photo = useSelector((state: RootState) => state.AuthorizationSignUpSlice.photo);
    const firstName = useSelector((state: RootState) => state.AuthorizationSignUpSlice.firstName);
    const lastName = useSelector((state: RootState) => state.AuthorizationSignUpSlice.lastName);
    const birthDay = useSelector((state: RootState) => state.AuthorizationSignUpSlice.birthDate);
    const username = useSelector((state: RootState) => state.AuthorizationSignUpSlice.username);
    const phone = useSelector((state: RootState) => state.AuthorizationSignUpSlice.phone);
    const dispatch = useDispatch();
    const categories = selectedCategories.filter(category => category.active).map(category => category.id);
    const registration = async () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('firstname', firstName);
        formData.append('lastname', lastName);
        formData.append('username', convertPhoneNumber(phone));
        formData.append('birthdate', convertDateFormat(birthDay));

        categories.forEach(val => {
            formData.append('category_ids', `${val}`);
        });
        if (photo) {
            formData.append('images', photo);
        }
        try {
            const response = await AuthorizationService.signUp(formData);
            console.log(response);
            navigate('/');
            dispatch(setIdSignUp(0));
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <button
                onClick={registration}
                className='border-[1px] w-[200px] h-[45px] rounded-[25px] border-zink-400 text-zinc-100 bg-select-green flex justify-center items-center'> Sign
                Up
            </button>
        </>
    )
}


export const setCanvasPreview1 = (canvas: HTMLCanvasElement, image: HTMLImageElement, crop: Crop) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("No 2d context");
    }

    // Calculate the scale factors for the image
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Set canvas dimensions to match the crop size
    canvas.width = crop.width;
    canvas.height = crop.height;

    // Clear the canvas before drawing the cropped image
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the cropped portion of the image onto the canvas
    ctx.drawImage(
        image,
        crop.x * scaleX, // Adjust x-coordinate based on scale
        crop.y * scaleY, // Adjust y-coordinate based on scale
        crop.width * scaleX, // Adjust width based on scale
        crop.height * scaleY, // Adjust height based on scale
        0, // Destination x-coordinate on canvas
        0, // Destination y-coordinate on canvas
        crop.width, // Destination width on canvas
        crop.height // Destination height on canvas
    );
};

