import React, {useEffect, useState} from 'react';
import EventDetails from "../components/Event/EventCreation/EventDetails";
import EventLocation from "../components/Event/EventCreation/EventLocation";
import EventCategories from "../components/Event/EventCreation/EventCategories";
import Navbar from "../components/Navbar/Navbar";
import {useDispatch} from "react-redux";
import {Category} from "../components/Authorization/Category/CategoryCard";
import {CategoryService} from "../service/Categories/CategoryService";
import {setCategoriesEvent} from "../stores/slices/EventCreationSlice";

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
    categories: Category[];
    max_age?: number;
    min_age?: number;
    img?: File;
}

const EventCreatePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        CategoryService.getCategories()
            .then(data => {
                dispatch(setCategoriesEvent(data.data.data.categories));
            })
            .catch(error => {
                dispatch(setCategoriesEvent([]));
            });
    }, []);

    const [id, setId] = useState(1);

    const EventPage = () => {
        switch (id) {
            case 1:
                return <EventDetails/>
            case 2:
                return <EventLocation/>
            case 3:
                return <EventCategories />
            default:
                return <EventDetails />
        }
    }
    return (
        <>
          <Navbar type={false}/>
            <div className='flex justify-center items-center gap-x-6 mt-[50px] mb-[30px]'>
                <div className='flex justify-evenly border-b-[1px] border-b-gray-200 w-[350px] h-[40px] gap-x-8 font-inter items-center'>
                    <span className={id === 1 ? 'text-black' : 'text-gray-500'}
                          onClick={() => setId(1)}>Event Details</span>
                    <span className={id === 2 ? 'text-black' : 'text-gray-500'} onClick={() => setId(2)}>Location</span>
                    <span className={id === 3 ? 'text-black' : 'text-gray-500'} onClick={() => setId(3)}>Category</span>
                </div>
            </div>
            <EventPage/>
        </>
    )
}

export default EventCreatePage;



