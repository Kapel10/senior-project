import React, { useState } from 'react';
import {PlusIcon} from "../../../Icons/Icons";
import {DatePicker, TimePicker} from 'antd';
import dayjs from 'dayjs';
import './event.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../stores/store";
import {
    setDate,
    setDescription,
    setImg,
    setMaxAge,
    setMinAge,
    setPrice,
    setSeats, setStartsAt,
    setTitle
} from "../../../stores/slices/EventCreationSlice";
const format = 'HH:mm';


const EventDetails = () => {
    const title = useSelector((state: RootState) => state.eventCreateStore.title);
    const description = useSelector((state: RootState) => state.eventCreateStore.description);
    const date = useSelector((state: RootState) => state.eventCreateStore.date);
    const start_time = useSelector((state: RootState) => state.eventCreateStore.starts_at);
    const finish_time = useSelector((state: RootState) => state.eventCreateStore.end_at);
    const seats = useSelector((state: RootState) => state.eventCreateStore.seats);
    const min_age = useSelector((state: RootState) => state.eventCreateStore.min_age);
    const max_age = useSelector((state: RootState) => state.eventCreateStore.max_age);
    const price = useSelector((state: RootState) => state.eventCreateStore.price);

    const [seatLimit, setSeatLimit] = useState(false);
    const [ageLimit, setAgeLimit] = useState(false);
    const [priceLimit, setPriceLimit] = useState(false);

    const dispatch = useDispatch();
    function handleImg(e: any) {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            dispatch(setImg(selectedFile));
        }
    }
    const handleAgeStatus = () => {
        setAgeLimit(prev => !prev);
        dispatch(setMinAge(undefined));
        dispatch(setMaxAge(undefined));
    }
    const handleMinAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(ageLimit){
            const input = event.target.value;
            const numbersOnly = input.replace(/[^0-9]/g, '');
            const rangeValue = Math.min(Number(numbersOnly), 100);
            dispatch(setMinAge(Number(rangeValue)));
        }
    };
    const handleMaxAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(ageLimit){
            const input = event.target.value;
            const numbersOnly = input.replace(/[^0-9]/g, '');
            const rangeValue = Math.min(Number(numbersOnly), 100);
            dispatch(setMaxAge(Number(rangeValue)));
        }
    };
    const handleSeatsStatus = () => {
        setSeatLimit(prev => !prev);
        dispatch(setSeats(undefined));
    }
    const handleSeatsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(seatLimit){
            const input = event.target.value;
            const numbersOnly = input.replace(/[^0-9]/g, '');
            const rangeValue = Math.min(Number(numbersOnly), 1000);
            dispatch(setSeats(rangeValue));
        }
    };
    const handlePriceStatus = () => {
        setPriceLimit(prev => !prev);
        dispatch(setPrice(undefined));
    }
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(priceLimit) {
            const input = event.target.value;
            const numbersOnly = input.replace(/[^0-9]/g, '');
            dispatch(setSeats(Number(numbersOnly)));
        }
    }

    return (
        <>
            <div className='mx-auto w-[1000px] font-inter'>
                <div className='w-full h-[40px] text-2xl border-b-[1px] border-b-gray-200'>General Info</div>
                <div className='flex mt-[15px]'>
                    <form className='w-[600px]'>
                        <label className='block mb-1'>Event Name</label>
                        <input
                            className='w-[460px] h-[50px] block outline-none bg-gray-100 rounded-[10px] p-5 mb-[20px]'
                            value={title} onChange={(event) => dispatch(setTitle(event.target.value))}
                            placeholder='Event name'/>
                        <label className='block mb-1'>Event Description</label>
                        <textarea className='outline-none bg-gray-100 rounded-[10px] w-[460px] p-5' rows={3}
                                  value={description}
                                  onChange={(event) => dispatch(setDescription(event.target.value))}
                                  placeholder='Event descrption'/>
                    </form>
                    <div
                        className='w-[380px] h-[220px] border-dotted border-[1px] border-black my-auto flex justify-center items-center'>
                        <input
                            type='file'
                            accept='.jpg, .jpeg, .png'
                            className='hidden'
                            onChange={handleImg}
                            id='uploadInput'
                        />
                        <label htmlFor='uploadInput'><PlusIcon/></label>
                    </div>
                </div>
                <div className='w-full h-[40px] text-2xl mt-[40px] border-b-[1px] border-b-gray-200'>Date and Time</div>
                <div className='flex mt-4 w-[600px] justify-between'>
                    <div className='w-[150px]'>
                        <label className='block'>Date</label>
                        <DatePicker
                            /*value={dayjs(date, { format: 'YYYY-MM-DD' })}*/
                            className='mb-5 mt-1 text-2xl hover:border-[#d9d9d9] focus:border-[#d9d9d9] focus-within:border-[#d9d9d9] bg-gray-100'
                            onChange={event => dispatch(setDate(`${event?.year()}-${((event?.month() ?? 0) + 1).toString().padStart(2, '0')}-${(event?.date() ?? 0).toString().padStart(2, '0')}`))}
                            placeholder={`${date.length > 1 ? date : 'Event day'}`}/>
                    </div>
                    <div className='w-[150px]'>
                        <label className='block'>Start Time</label>
                        <TimePicker defaultValue={dayjs(`${start_time}`, format)} format={format}
                                    onChange={event => dispatch(setStartsAt(`${event?.hour()}:${event?.minute().toString().padStart(2, '0')}`))}
                                    className='mt-1 h-[34px] bg-gray-100 hover:border-[#d9d9d9] focus:border-[#d9d9d9] focus-within:border-[#d9d9d9]'/>

                    </div>
                    <div className='w-[150px]'>
                        <label className='block'>Finish Time</label>
                        <TimePicker defaultValue={dayjs(`${finish_time}`, format)} format={format}
                                    onChange={event => dispatch(setStartsAt(`${event?.hour()}:${event?.minute().toString().padStart(2, '0')}`))}
                                    className='mt-1 h-[34px] bg-gray-100 hover:border-[#d9d9d9] focus:border-[#d9d9d9] focus-within:border-[#d9d9d9]'/>
                    </div>
                </div>
                <div className='w-full h-[40px] text-2xl mt-[40px] border-b-[1px] border-b-gray-200'>Additional
                    Details
                </div>
                <div className='flex mt-4 mb-[200px]'>
                    <div className='w-[350px]'>
                        <div className='flex items-center gap-x-4 mt-1'>
                            <span className=''>Seats: </span>
                            <input onClick={handleSeatsStatus} type='checkbox'
                                   className='w-[20px] h-[20px] mb-0'/>
                        </div>
                        {seatLimit && <><span>Maximum number of seats:</span>
                            <input type='text'
                                   pattern="[0-9]*"
                                   value={seats} onChange={handleSeatsChange}
                                   className='mt-4 ml-2 text-center min-w-[40px] max-w-[60px] h-[30px] bg-gray-100 outline-none rounded-[5px]'/>
                        </>}
                    </div>
                    <div className='w-[450px]'>
                        <div className='flex items-center gap-x-4 mt-1'>
                            <label className=''>Age restrictions: </label>
                            <input type='checkbox' className='w-[20px] h-[20px] mb-0' onClick={handleAgeStatus}/>
                        </div>
                        {ageLimit && <div className='block'>
                            <span>Minimum age:</span>
                            <input type='text'
                                   value={min_age}
                                   onChange={handleMinAgeChange}
                                   className='mt-4 ml-2 mr-3 text-center w-[40px] h-[30px] bg-gray-100 outline-none rounded-[5px]'/>
                            <span>Maximum age:</span>
                            <input type='text'
                                   value={max_age}
                                   onChange={handleMaxAgeChange}
                                   className='mt-4 ml-2 text-center w-[40px] h-[30px] bg-gray-100 outline-none rounded-[5px]'/>
                        </div>}

                    </div>
                    <div className='w-[350px]'>
                        <div className='flex items-center gap-x-2 mt-1'>
                            <span className=''>Set price: </span>
                            <input type='checkbox' className='w-[20px] h-[20px] mb-0' onClick={handlePriceStatus}/>
                        </div>
                        {priceLimit && <>
                            <span>Price:</span>
                            <input type='text'
                                   value={price}
                                   onChange={handlePriceChange}
                                   className='mt-4 ml-2 text-center w-[40px] h-[30px] bg-gray-100 outline-none rounded-[5px]'/>

                        </>}

                    </div>
                </div>

            </div>
        </>
    )
}

export default EventDetails;

// {img && <img src={URL.createObjectURL(img)}/>}
/*

const [numbers, setNumbers] = useState<number[]>([1]);

    const addNumber = (index: number) => {
        if (index === numbers.length - 1) {
            // Clicked on the div with the plus sign
            const newNumbers = [...numbers, numbers.length + 1];
            setNumbers(newNumbers);
        }
    };

<div
                className='w-[380px] h-[220px] border-dotted border-[1px] border-black my-auto grid grid-cols-3 grid-rows-3'>
                {numbers.length <= 9 && <>
                    {numbers.map((number, index) => (
                        <div key={index} className='w-[100px] h-[50px] border-[1px] border-solid flex justify-center items-center' onClick={() => addNumber(index)}>
                            {number === numbers.length ? '+' : number}
                        </div>
                    ))}
                </>}

            </div>

 */