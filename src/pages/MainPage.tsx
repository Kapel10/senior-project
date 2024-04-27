import React from 'react';
import Navbar from "../components/Navbar/Navbar";
import MainContent from "../components/MainContent/MainContent";
import SideBar from "../components/SideBar/SideBar";
import EventLibrary from "../components/Event/Library/EventLibrary";
import Community from "../components/User/Community";
import {RootState} from "../stores/store";
import {useSelector} from "react-redux";
const MainPage = () => {
    const id = useSelector((state: RootState) =>  state.MainPageSlice.id);
    return(
        <>
            <Navbar type={true}/>
            <div className='flex font-inter h-screen'>
                <div className='w-[65%]'>
                    {id === 0 ? <MainContent/> : <> </>}
                    {id === 1 ? <EventLibrary/> : <> </>}
                    {id === 2 ? <Community/> : <> </>}
                </div>
                <div className='w-[1%] border-r-[1px] border-r-gray-200'></div>
                <div className='w-[34%]'><SideBar/></div>
            </div>
        </>
    )
}

export default MainPage;