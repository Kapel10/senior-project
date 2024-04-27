import React from "react";
import SignUp from "../components/Authorization/SignUp";
import SignIn from "../components/Authorization/SignIn";


const Authorization = () => {
    return (
        <>
            <div className='inset-0 bg-black bg-opacity-50'></div>

            <div className='fixed top-0 left-0 w-full bg-white z-10 flex flex-col items-center'>
                <div className='flex justify-between items-center w-10/12 py-6 px-4'>
                    <div className='text-black text-2xl'>
                        NuEvents
                    </div>
                    <div>
                        <div className='flex items-center gap-x-4'>
                            <span>About</span>
                            <span><SignIn/></span>
                            <SignUp/>
                        </div>
                    </div>
                </div>
                <div className='w-full border-b border-black border-[1px]'></div>
            </div>
            <div className='relative'>
                <img src='https://keystoneacademic-res.cloudinary.com/image/upload/element/18/180761_Panolowheight4k.jpg' alt='university'
                     style={{filter: "brightness(90%)"}}/>
                <div className='text-5xl absolute top-[150px] left-[80px] font-bold'>Explore new experience.</div>
                <div className='text-2xl absolute top-[210px] left-[80px] font-semibold'>Discover new places, friends
                    and memories with others.
                </div>
            </div>
            <div className='w-full border-b border-black border-[1px]'></div>
        </>
    )
}
export default Authorization;

/*
https://smapse.com/storage/2019/09/x1-3.jpg


 */

