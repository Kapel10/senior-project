import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar/Navbar";
import {SearchIcon} from "../Icons/Icons";
import SearchMap from "../components/Map/SearchMap";
import {useSelector} from "react-redux";
import {RootState} from "../stores/store";
import {extractHourAndMinutes, formatDateToMonthDay} from "../utils/Utils";
import { Spin } from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import EventPage from "./EventPage";
import {useNavigate} from "react-router-dom";
import EventPhoto from "../components/Event/EventPhoto";
import UserProfilePhoto from "../components/User/UserProfilePhoto";
import EventSearchPreviewImg from "../components/Event/Search/EventSearchPreviewImg";


const SearchPage = () => {
    const mapW = `calc(100vw - 1000px)`;
    const mapH = `calc(100vh - 60px)`;

    const [id, setId] = useState(0);

    const [searchValue, setsal] = useState('');

    const selectedEvent = useSelector((state: RootState) => state.YandexMapSlice.event);

    const [searchEvent, setSearchEvent] = useState('');

    const navigate = useNavigate();

    const handleGoToUserPage = (id: number) => {
        navigate(`/event/${id}`);
    };

    return (
        <>
            <Navbar type={true}/>
            <div className='flex justify-center items-center'>
                <div className='h-[560px] border-[1px] border-select-green' style={{width: mapW, height: mapH}}>
                    <div className='flex justify-center items-center relative my-3'>
                        <div className='relative flex items-center'>
                            <div className='absolute left-4'><SearchIcon/></div>
                            <input className='outline-none bg-select-gray rounded-[20px] w-[400px] pl-[55px] py-4'
                                    value={searchEvent}
                                   onChange={(event) => setSearchEvent(event.target.value)}
                                   placeholder='Search events'/>
                        </div>
                    </div>
                    <div className='border-[1px] border-solid'></div>
                    {selectedEvent && <div className='flex flex-col gap-y-2'>
                        <div className='mx-[20px]'>
                            <div className=' my-[10px]'>
                                {selectedEvent.images.length > 0 &&  <EventSearchPreviewImg url={selectedEvent.images[0]} width={400} height={200} rounded={true}/>}
                            </div>
                            <div className='text-2xl mb-[10px] font-semibold' onClick={()=> handleGoToUserPage(selectedEvent.eventId) }> {selectedEvent.title}</div>
                            <div className='text-sm text-justify mb-[5px] text-gray-500'>{selectedEvent.description}
                            </div>
                            <div className=''>Followers: <span
                                className='text-select-green'>{selectedEvent.followerCount}</span></div>
                            <div className=''>Likes: <span
                                className='text-select-green'>{selectedEvent.likeCount} </span>
                            </div>
                        </div>
                        <div className='flex items-center justify-evenly h-[50px] bg-select-gray relative mb-[10px]'>
                            <span className='' onClick={() => setId(0)}>Contacts</span>
                            <span onClick={() => setId(1)}>Author</span>
                            <span onClick={() => setId(2)}>Additional Info</span>
                            {id === 0 && (
                                <div
                                    className='w-[73px] h-[1px] absolute border-select-green bottom-[10px] left-[50px] border-[1px]'>
                                </div>
                            )}
                            {id === 1 && (
                                <div
                                    className='w-[55px] h-[1px] absolute border-select-green bottom-[10px] left-[170px] border-[1px]'>
                                </div>
                            )}
                            {id === 2 && (
                                <div
                                    className='w-[120px] h-[1px] absolute border-select-green bottom-[10px] left-[270px] border-[1px]'>
                                </div>
                            )}
                        </div>
                        {id === 0 && (
                            <div className='ml-[20px]'>
                                <div className='flex gap-x-2 mb-[5px]'>
                                    <div>Address:</div>
                                    <div>{selectedEvent.location.address}</div>
                                </div>
                                <div className='flex gap-x-2'>
                                    <div>
                                        Time:
                                    </div>
                                    <div>
                                        <span
                                            className='font-semibold'>{formatDateToMonthDay(selectedEvent.startsAt)}</span>
                                        <span> </span>
                                        <span
                                            className='font-semibold'>{extractHourAndMinutes(selectedEvent.startsAt)}</span>
                                        <span> - </span>
                                        <span
                                            className='font-semibold'>{extractHourAndMinutes(selectedEvent.endsAt)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {id === 1 && (
                            <div className='flex ml-[20px] items-center gap-x-2'>
                                <UserProfilePhoto username={selectedEvent.author.username} width={70} height={70} />
                                <div>
                                    <div>{selectedEvent.author.firstname} {selectedEvent.author.lastname}</div>
                                    <div className='text-sm font-semibold'>@{selectedEvent.author.username}</div>
                                </div>
                            </div>
                        )}
                        {id === 2 && (
                            <div className='flex flex-col'>
                                <div className='flex gap-x-2 ml-[20px] mb-[10px]'>
                                    {selectedEvent.categories.length > 0 && selectedEvent.categories.map(cat => (
                                        cat && (
                                            <div key={cat.categoryId}
                                                 className='bg-gray-200 rounded-[15px] min-w-[30px] max-w-[200px] p-3 h-[35px] flex justi-center items-center'>
                                                {cat.categoryName}
                                            </div>
                                        )
                                    ))}
                                </div>
                                <div className='ml-[30px]'>
                                    {selectedEvent.ageMin && (
                                        <span>Min age: {selectedEvent.ageMin}</span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    }
                </div>
                <div>
                    <SearchMap x={1000} y={730} showUser={true} searchEvent={searchEvent}/>
                </div>
            </div>


        </>
    )

}

export default SearchPage;

/*
 <EventPhoto url={selectedEvent.images[0]} width={40} height={40}/>

    useEffect(() => {
        CategoryService.getCategories()
            .then(data => {
                const firstElement: Category = {
                    id: -1,
                    name: 'Explore Topics',
                    active: false
                }
                const newCategory = [firstElement, ...data.data.data.categories];
                dispatch(setCategoriesEvent(newCategory));
            })
            .catch(error => {
                dispatch(setCategoriesEvent([]));
            });
    }, []);




const categories = useSelector((state: RootState) => state.eventCreateStore.categories);
  <EventSearch>
                <div className="flex space-x-2 scrollbar-hide ">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className={`inline-flex justify-center items-center w-max h-[35px] rounded-[15px] px-2 py-2 leading-5  transition-colors duration-150 bg-select-gray border  cursor-pointer focus:outline-none ${
                                index === 0 ? 'border-[1px] border-black gap-x-1 mr-[15px]' : 'border-transparent'
                            }`}
                        >
                            {category.id === -1 && <EarthIcon/>}
                            {category.name}
                        </div>
                    ))}
                </div>
            </EventSearch>
 */