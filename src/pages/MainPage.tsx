import React from 'react';
import Navbar from "../components/Navbar/Navbar";
import MainContent from "../components/MainContent/MainContent";
import SideBar from "../components/SideBar/SideBar";
const MainPage = () => {
    return(
        <>
            <Navbar/>
            <div className='flex font-inter'>
                <div className='w-[65%]'><MainContent/></div>
                <div className='w-[1%] border-r-[1px] border-r-gray-200'></div>
                <div className='w-[34%]'><SideBar/></div>
            </div>
        </>
    )
}

export default MainPage;