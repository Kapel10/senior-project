import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar/Navbar";
import {useParams} from "react-router-dom";
import PersonMain from "../components/Person/PersonMain";
import PersonSide from "../components/Person/PersonSide";
import {UserService} from "../service/User/UserService";
import {UserInformation} from "../interface/User/UserInformation";
import {EventInformation} from "../interface/Event/EventInformation";

export interface UserProp {
    "user": UserInformation;
    "own": EventInformation[];
    "events": {
        "followed": EventInformation[];
        "favourite": EventInformation[];
        "past": EventInformation[];
    }
    "followed_user": null;
}


const PersonPage = () => {

    const {username} = useParams();

    const [user, setUser] = useState<UserProp>();

    const getUserInfo = async () => {
        if (username) {
            const {data} = await UserService.getUserProfile(username);
            console.log(data);
            setUser(data.data);
        }
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <>
            <Navbar type={true}/>
            <div className='flex font-inter h-screen'>
                <div className='w-[65%]'>
                    {user && <PersonMain user={user}/>}
                </div>
                <div className='w-[1%] border-r-[1px] border-r-gray-200'></div>
                <div className='w-[34%]'>
                    {user && <PersonSide user={user}/>}
                </div>
            </div>
        </>
    )
}

export default PersonPage;