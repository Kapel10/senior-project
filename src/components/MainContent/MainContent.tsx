import React from 'react';
import {PlusIcon} from "../../Icons/Icons";
import EventList from "../Event/EventList";

const MainContent = () => {
    return(
        <>
            <div>
                <div className='flex justify-start border-b-[1px] border-b-gray-200 w-[730px] mx-auto h-[40px] mt-[50px] mb-[30px] gap-x-8'>
                    <PlusIcon/>
                    <span>For you</span>
                    <span>Followed</span>
                    <span>Trending</span>
                    <span>Joined</span>
                    <span>Hosted</span>
                </div>
                <div className='w-[730px] mx-auto'>
                    <EventList/>
                </div>
            </div>
        </>
    )
}

export default MainContent;