import React from 'react';
import Navbar from "../components/Navbar/Navbar";
import EventLibrary from "../components/Event/Library/EventLibrary";
import SideBar from "../components/SideBar/SideBar";
import UserSettings from "../components/User/UserSettings";
import UserInfo from "../components/User/UserInfo";

const UserPage = () => {
    return(
        <>
            <Navbar type={true}/>
            <div className='flex font-inter h-screen'>
                <div className='w-[65%]'><UserSettings/></div>
                <div className='w-[1%] border-r-[1px] border-r-gray-200'></div>
                <div className='w-[34%]'><UserInfo/></div>
            </div>

        </>
    )


}

export default UserPage;