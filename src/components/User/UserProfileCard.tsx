import React, {useEffect, useState} from 'react';
import UserProfilePhoto from "./UserProfilePhoto";
import {UserService} from "../../service/User/UserService";

export interface IUserCard {
    username: string;
    userId: number;
}

const UserProfileCard: React.FC<IUserCard> = ({username, userId}) => {
    const [followStatus, setFollowStatus] = useState<boolean>();
    const followUser = async (id: string) => {
        try {
            const response = await UserService.followUser(id);
        } catch (error) {
            console.log(error)
        }

    }

    const checkFollowStatus = async (id: string) => {
        try {
            const response = await UserService.checkFollowed(id);
            setFollowStatus(response.data.data.followed);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        checkFollowStatus(userId.toString());
    }, []);

    return (
        <>
            <div className='flex gap-x-2 items-center justify-between' key={userId}>
                <UserProfilePhoto username={username} width={40} height={40}/>
                <div className='text-xl font-normal'>{username}</div>
                <button className={`border-[1px] border-select-green text-sm ${followStatus ? 'w-[85px] bg-white text-select-green' : 'w-[65px] text-white bg-select-green'} rounded-2xl h-[30px] flex justify-center items-center`}
                        onClick={() => followUser(userId.toString())}>{followStatus ? 'Following' : 'Follow' }
                </button>
            </div>
        </>
    )
}

export default UserProfileCard;