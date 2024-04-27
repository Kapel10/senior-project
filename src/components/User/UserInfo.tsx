import React from 'react';
import UserProfilePhoto from "./UserProfilePhoto";
import {useSelector} from "react-redux";
import {RootState} from "../../stores/store";

const UserInfo = () => {
    const username = useSelector((state: RootState) => state.userSlice.username);
    const lastName = useSelector((state: RootState) => state.userSlice.lastname);
    const fistName = useSelector((state: RootState) => state.userSlice.firstname);
    return (
        <>
            <div className='mx-auto w-[300px] mt-[40px] flex flex-col'>
                <UserProfilePhoto username={username} width={80} height={80} />
                <div>{fistName} {lastName}</div>
                <hr className='mx-auto w-[300px] mt-[30px] mb-[20px]'/>
                <div className='flex justify-between w-[200px]'>
                    <div>
                        Created Events:
                    </div>
                    <div className='text-select-green'>
                        4
                    </div>
                </div>
                <div className='flex justify-between w-[200px]'>
                    <div>
                        Likes:
                    </div>
                    <div className='text-select-green'>
                        15
                    </div>
                </div>
                <div className='flex justify-between w-[200px]'>
                    <div>
                        Followers:
                    </div>
                    <div className='text-select-green'>
                        20
                    </div>
                </div>
                <div className='flex justify-between w-[200px]'>
                    <div>
                        Followings:
                    </div>
                    <div className='text-select-green'>
                        5
                    </div>
                </div>
            </div>
        </>
    )


}

export default UserInfo;