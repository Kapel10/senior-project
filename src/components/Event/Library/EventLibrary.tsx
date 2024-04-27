import React, {useEffect, useState} from 'react'
import UserProfilePhoto from "../../User/UserProfilePhoto";
import FollowedPeople from "../../Community/FollowedPeople";
import Followers from "../../Community/Followers";
import {EventService} from "../../../service/Event/EventService";
import EventPhoto from "../EventPhoto";
import {extractHourAndMinutes, formatDateToMonthDay} from "../../../utils/TimeUtil";

interface EventLibrary {
    "id": number,
    "title": string,
    "description" : string,
    "address": string,
    "date": string,
    "startsAt": string,
    "endsAt": string,
    "images": string[],
    "price": number,
    "attendeesCount": number,
    "likesCount": number,
    "user" : {
        "username" :string ,
        firstname
            :
            string,
        id
            :
            number,
        lastname
            :
            string
    }
}

interface LibraryList{
    "events": {
        "followed" : EventLibrary[],
    },
    "own" : EventLibrary[],
}

const EventLibrary = () => {
    const [id, setId] = useState(0);
    const [eventData, setEventData] = useState<LibraryList[]>([]);
    const [selectCreated, setSelectCreate] = useState<EventLibrary[]>([]);
    const [selectFollowed, setSelectFollow] = useState<EventLibrary[]>([]);

    const getInfo = async () => {
        try {
            const response = await EventService.getMyself();
            setEventData(response.data.data);
            setSelectCreate(response.data.data.own);
            setSelectFollow(response.data.data.events.followed);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getInfo();
    }, []);


    return (
        <>
            <div className=''>
                <div className='text-4xl font-bold ml-[100px] mt-[40px]'>Your library</div>
                <div
                    className=' relative flex justify-start border-b-[1px] border-b-gray-200 w-[730px] mx-auto h-[40px] mt-[50px] mb-[30px] gap-x-8'>
                    <span onClick={() => setId(0)}>Created Events</span>
                    <span onClick={() => setId(1)}>Followed Events</span>
                    <span onClick={() => setId(2)}>Participated Events</span>
                    <span onClick={() => setId(3)}>Saved Events</span>
                    <div
                        className={` ${id === 0 ? 'w-[130px] top-[39px] left-0' : ''} bg-black absolute border-black border-[1px]`}>
                    </div>
                    <div
                        className={` ${id === 1 ? 'w-[150px] top-[39px] left-[130px]' : ''} bg-black absolute border-black border-[1px]`}>
                    </div>
                    <div
                        className={` ${id === 2 ? 'w-[180px] top-[39px] left-[280px]' : ''} bg-black absolute border-black border-[1px]`}>
                    </div>
                    <div
                        className={` ${id === 3 ? 'w-[180px] top-[39px] left-[460px]' : ''} bg-black absolute border-black border-[1px]`}>
                    </div>
                </div>
                <div className='flex flex-col  ml-[100px]'>
                    {id === 0 && selectCreated.length > 0 &&  selectCreated.map(ev => (
                        <>
                            <div className='w-[800px] h-[180px] flex  gap-x-4 items-center'>
                                <div>
                                    {ev.images &&  ev.images.length > 0 &&  <EventPhoto url={ev.images[0]} width={130} height={130} rounded={true}/>}

                                </div>
                                <div className='flex flex-col gap-y-3'>
                                    {ev.user &&
                                        <>
                                            <UserProfilePhoto username={ev.user.username} width={40} height={40}/>
                                            <span>{ev.user.firstname} {ev.user.lastname}</span>
                                        </>
                                    }
                                    <span className='font-bold text-2xl'>{ev.title}</span>
                                    {ev.description && (
                                        <p className='text-gray-600'>
                                            {ev.description.length > 100 ? `${ev.description.slice(0, 150)} ...` : ev.description}
                                        </p>
                                    )}
                                    <span className='text-gray-600'>
                            {formatDateToMonthDay(ev.date)}, 2024 | {ev.address} | {extractHourAndMinutes(ev.startsAt)}
                        </span>
                                </div>
                            </div>
                        </>
                    ))}

                    {id === 1 && selectFollowed.length > 0 &&  selectFollowed.map(ev => (
                        <>
                            <div className='w-[800px] h-[180px] flex  gap-x-4 items-center'>
                                <div>
                                    {ev.images &&  ev.images.length > 0 &&  <EventPhoto url={ev.images[0]} width={130} height={130} rounded={true}/>}

                                </div>
                                <div className='flex flex-col gap-y-3'>
                                    {ev.user &&
                                        <>
                                            <UserProfilePhoto username={ev.user.username} width={40} height={40}/>
                                            <span>{ev.user.firstname} {ev.user.lastname}</span>
                                        </>
                                    }
                                    <span className='font-bold text-2xl'>{ev.title}</span>
                                    {ev.description && (
                                        <p className='text-gray-600'>
                                            {ev.description.length > 100 ? `${ev.description.slice(0, 150)} ...` : ev.description}
                                        </p>
                                    )}

                                    <span className='text-gray-600'>
                            {formatDateToMonthDay(ev.date)}, 2024 | {ev.address} | {extractHourAndMinutes(ev.startsAt)}
                        </span>
                                </div>
                            </div>
                        </>
                    ))}
                </div>


            </div>
        </>
    )
}


export default EventLibrary;

/*


 */