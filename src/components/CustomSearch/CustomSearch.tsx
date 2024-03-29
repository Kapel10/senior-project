import React from 'react';
import {SearchIcon} from '../../Icons/Icons'
const CustomSearch = () => {
    return(
        <>
            <div className='flex items-center justify-center relative'>
                <div className='absolute left-3'><SearchIcon/></div>
                <input type='text' placeholder='Search' className='w-[240px] h-[40px] outline-none bg-gray-100 rounded-[15px] pl-10'/>
            </div>
        </>
    )
}

export default CustomSearch;