import React,{ useState } from 'react';
import EventDetails from "../components/Event/EventCreation/EventDetails";
import EventLocation from "../components/Event/EventCreation/EventLocation";
import EventCategories from "../components/Event/EventCreation/EventCategories";
import Navbar from "../components/Navbar/Navbar";
import {message} from "antd";
import {useSelector} from "react-redux";
import {RootState} from "../stores/store";

export interface EventCreationI {
    title: string;
    description: string;
    price?: number;
    seats?: number;
    address: string;
    lg: number;
    lt: number;
    date: string;
    starts_at: string;
    end_at: string;
    categories: number[];
    max_age?: number;
    min_age?: number;
    img?: File;
}

const EventCreatePage = () => {

    const [id, setId] = useState(1);
    const [messageApi, contextHolder] = message.useMessage();
    const eventPhoto = useSelector((state: RootState) => state.eventCreateStore.img);
    const eventCategroies = useSelector((state: RootState) => state.eventCreateStore.categories);

    const EventPage = () => {
        switch (id) {
            case 1:
                return <EventDetails/>
            case 2:
                return <EventLocation/>
            case 3:
                return <EventCategories/>
            default:
                return <EventDetails/>
        }
    }

    const createEvent = () => {
        /*
        const formData = new FormData();
        if(eventPhoto){
            formData.append('images',eventPhoto);
        }
        if(eventCategroies.length < 2){
            messageApi.open({
                type: 'error',
                content: 'Please,select more than 2 category type',
                style: {
                    fontFamily: 'Inter, sans-serif',
                },
            });
            return
        }



        console.log(1)

         */
    }



    return (
        <>
          <Navbar/>
            <div className='flex justify-center items-center gap-x-6 mt-[50px] mb-[30px]'>
                <div className='flex justify-evenly border-b-[1px] border-b-gray-200 w-[350px] h-[40px] gap-x-8 font-inter items-center'>
                    <span className={id === 1 ? 'text-black' : 'text-gray-500'}
                          onClick={() => setId(1)}>Event Details</span>
                    <span className={id === 2 ? 'text-black' : 'text-gray-500'} onClick={() => setId(2)}>Location</span>
                    <span className={id === 3 ? 'text-black' : 'text-gray-500'} onClick={() => setId(3)}>Category</span>
                </div>
                    <button
                        onClick={createEvent}
                        className='border-[1px] w-[90px] h-[30px] rounded-[15px] border-black bg-green-500'>Finish
                    </button>
            </div>
            <EventPage/>
            {contextHolder}
        </>
    )
}

export default EventCreatePage;
//