import React, {useEffect, useState} from "react";
import UserProfileCard, {IUserCard} from "../User/UserProfileCard";
import {UserService} from "../../service/User/UserService";

const FollowedPeople = () => {

    const [followedList, setFollowedList] = useState<IUserCard[]>([]);

    const getFollowedPeople = async () => {
        try{
            const response = await UserService.getFollowedList();
            const users = response.data.data.followed;
            if (users !== null) {
                setFollowedList(users);
            } else {
                setFollowedList([]);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFollowedPeople();
    }, []);

    return (
        <>
            <div className='flex flex-col items-center gap-y-3'>
                {followedList.map(followed => (
                    <UserProfileCard username={followed.username} userId={followed.userId} key={followed.userId}/>
                ))}
            </div>
        </>
    )
}

export default FollowedPeople;