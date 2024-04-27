import React, {useEffect, useState} from "react";
import UserProfileCard, {IUserCard} from "../User/UserProfileCard";
import {UserService} from "../../service/User/UserService";

const Followers = () => {

    const [followersList, setFollowersList] = useState<IUserCard[]>([]);

    const getFollowers = async () => {
        try{
            const response = await UserService.getFollowerList();
            const users = response.data.data.followers;
            if (users !== null) {
                setFollowersList(users);
            } else {
                setFollowersList([]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFollowers();
    }, []);

    return (
        <>
            <div className='flex flex-col items-center gap-y-3'>
                {followersList.map(followed => (
                    <UserProfileCard username={followed.username} userId={followed.userId} key={followed.userId}/>
                ))}
            </div>
        </>
    )
}

export default Followers;