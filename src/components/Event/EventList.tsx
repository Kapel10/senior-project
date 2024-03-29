import React from 'react';
import EventCard from "./EventCard";

const arr: number[] = [1,2,3,4,5,6,7,8,9,10]

const EventList = () => {
    return (
        <>
            <div className='flex flex-wrap gap-16'>
                {arr.map(v => <EventCard key={v}/>)}
            </div>
        </>
    )
}

export default EventList;