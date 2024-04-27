import React, {useEffect, useState} from 'react';
import {UserProp} from "../../pages/PersonPage";
import UserProfileUrl from "../User/UserProfileUrl";
import {UserService} from "../../service/User/UserService";

interface PersonProp {
    user: UserProp;
}

const PersonSide: React.FC<PersonProp> = ({user}:PersonProp) => {
    const [checkFollow, setCheckFollow] = useState(false);

    const FollowUser = async() => {
        if (checkFollow) {
            await UserService.unFollowUser(user.user.userId.toString());
        } else {
            await UserService.followUser(user.user.userId.toString());
        }
        CheckFollow();
    }

    const CheckFollow = async() => {
        try {
            const {data} = await UserService.checkFollowed(user.user.userId.toString());
            setCheckFollow(data.data.followed);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        CheckFollow();
    }, []);

    return (
        <>
            <div className='mx-auto w-[300px] mt-[40px] flex flex-col'>
                <UserProfileUrl username={user.user.profileImage} width={90} height={90}/>
                <div className='mb-[10px]'>{user.user.firstname} {user.user.lastname}</div>
                <div className='mb-[10px]'>500 Followers</div>
                <div className=''>
                    <button onClick={FollowUser}
                        className='mb-[30px] w-[80px] h-[30px] flex justify-center items-center text-white bg-select-green rounded-2xl'>
                        {checkFollow ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
                <div className='mb-[10px]'>Following</div>
                <div className='flex items-center gap-x-3 w-[200px] mb-[10px]'>
                    <div className='w-[40px] h-[40px] rounded-full bg-red-100'></div>
                    <div>Farkhad Amanbay</div>
                </div>
                <div className='flex items-center gap-x-3 w-[200px] mb-[10px]'>
                    <div className='w-[40px] h-[40px] rounded-full bg-red-100'></div>
                    <div>Alan Mukeyev</div>
                </div>
                <div className='flex items-center gap-x-3 w-[200px] mb-[10px]'>
                    <div className='w-[40px] h-[40px] rounded-full bg-red-100'></div>
                    <div>Leonel Messi</div>
                </div>
                <div className='text-sm flex justify-end'>See all(132)</div>
            </div>
        </>
    )
}


export default PersonSide;