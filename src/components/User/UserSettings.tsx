import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../stores/store";
import UserProfilePhoto from "./UserProfilePhoto";


const UserSettings = () => {
    const fistName = useSelector((state: RootState) => state.userSlice.firstname);
    const lastName = useSelector((state: RootState) => state.userSlice.lastname);
    const username = useSelector((state: RootState) => state.userSlice.username);
    return(
            <>
                <div className=''>
                    <div className='text-4xl font-bold ml-[100px] mt-[60px]'>{fistName} {lastName}</div>
                    <div
                        className='flex justify-start border-b-[1px] border-b-gray-200 w-[730px] mx-auto h-[40px] mt-[50px] mb-[20px] gap-x-8'>
                        <span>Account Settings</span>
                    </div>
                    <div className='mx-auto w-[730px] flex flex-col gap-y-6'>
                        <div className='flex justify-between items-center'>
                            <span>Email address</span>
                            <span className='text-gray-500'>rakhymzhan.turlybek@nu.edu.kz</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Username</span>
                            <span className='text-gray-500'>rahmuni</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Your Name</span>
                            <span className='text-gray-500'>Rakhymzhan Turlybek</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Profile Photo</span>
                            <UserProfilePhoto username={username} width={32} height={32} />
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Categories preferences</span>
                            <span className='text-gray-500'>3 categories</span>
                        </div>
                        <hr className='w-[730px] mx-auto'/>
                        <div className='flex flex-col'>
                            <span className='text-red-500'>Delete Account</span>
                            <span
                                className='text-gray-500'>Permanently delete your account and all of your content.</span>
                        </div>


                    </div>

                </div>

            </>
    )


}

export default UserSettings;