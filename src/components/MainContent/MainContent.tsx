import React, {useEffect, useState} from 'react';
import {PlusIcon} from "../../Icons/Icons";
import EventList from "../Event/EventList";
import {EventService} from "../../service/Event/EventService";
import {IEventInterface} from "../../interface/request/Event/IEventInterface";
import UserProfilePhoto from "../User/UserProfilePhoto";
import UserProfileUrl from "../User/UserProfileUrl";
import {refreshPage} from "../../utils/Utils";

const MainContent = () => {
    const [events, setEvents] = useState<IEventInterface[]>([]);

    const getEvents = async () => {
        try {

            const request = {
                "text": "NUFL",
                "coordinate": {
                    "maxLon": 100.0,
                    "minLon": 0,
                    "maxLat": 100.0,
                    "minLat": 0,
                    "centerLat": 71.430427551270, /// center coordinate or user location if available
                    "centerLog": 51.128200531006
                },
                "categoies": [],
                "minAge": 0,
                "sort": [
                    {
                        "order": "asc", //"desc"
                        "by": "like_count"// follower_count like_count starts_at
                    },
                    {
                        "order": "asc", //"desc"
                        "by": "starts_at"//
                    }
                ]
            }
            //const response = await EventService.searchEvent(request);
            //setEvents(response.data.data);
            //console.log(response);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getEvents();
    }, []);


    return (
        <>
            <div>
                <div
                    className='flex justify-start border-b-[1px] border-b-gray-200 w-[730px] mx-auto h-[40px] mt-[50px] mb-[30px] gap-x-8'>
                    <PlusIcon/>
                    <span className='font-semibold'>For you</span>
                    <span>Followed</span>
                    <span>Trending</span>
                    <span>Joined</span>
                    <span>Hosted</span>
                </div>
                <div className='w-[730px] mx-auto'>
                    <div className='flex flex-col gap-y-3 my-[10px]'>
                        <div className='flex gap-x-3'>
                            <div>
                                <UserProfileUrl
                                    rounded={true}
                                    username='data:image/jpeg;base64,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'
                                    width={120} height={120}/>
                            </div>
                            <div className='flex flex-col'>
                                <span className='font-bold text-2xl'>Football Championship</span>
                                <p className='text-gray-600'>
                                    Electrify America’s newest, indoor charging concept reimagines
                                    the electric vehicle experience for the better. And I love it.
                                </p>
                                <span className='text-gray-600'>
                            Feb 9, 2024 | Turkestan 28/1 | 14:00
                        </span></div>
                        </div>
                        <div className='flex gap-x-3 my-[10px]'>
                            <div>
                                <UserProfileUrl
                                    rounded={true}
                                    username='data:image/jpeg;base64,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'
                                    width={120} height={120}/>
                            </div>
                            <div className='flex flex-col'>
                                <span className='font-bold text-2xl'>Tennis Championship</span>
                                <p className='text-gray-600'>
                                    In the world of football, the tournament is not merely a competition but a testament to the universal language of passion,
                                </p>
                                <span className='text-gray-600'>
                                    Apr 14, 2024 | Kabanbay Batyr 53 | 10:00
                        </span></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainContent;
/*

<div>
                                        <UserProfilePhoto username='farikosha' width={40} height={40}/>
                                        <span>Rakhymzhan Turlybek</span>
                                    </div>

{events && events.map(event => (
                        <>
                            <div>
                                {event.title}
                                {event.images && <img src={event.images[0].url}/>}

                            </div>
                        </>
                    ))}
 */