import React from 'react';
import {SearchIcon} from '../../Icons/Icons'
import {useNavigate} from "react-router-dom";
const CustomSearch = () => {
    const navigate = useNavigate();
    return(
        <>
            <div className='flex items-center justify-center relative' onClick={() => navigate('/search')}>
                <div className='absolute left-3'><SearchIcon/></div>
                <input type='text' placeholder='Search' className='w-[240px] h-[40px] outline-none bg-gray-100 rounded-[15px] pl-10'/>
            </div>
        </>
    )
}

export default CustomSearch;