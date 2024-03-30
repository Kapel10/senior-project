import React from 'react';
import CategoryList from "../Authorization/Category/CategoryList";
import {Category} from "../Authorization/Category/CategoryCard";


const SideBar = () => {
    const category_list :Category[] = [ {id: 1, name:'Technology', active: false}, {id: 2, name: 'Self Improvement', active: false},
        {id: 3, name:  'Writing', active: false},{ id: 4, name: 'Relationship', active: false}, { id: 5, name: 'Machine Learning', active: false}, { id: 6, name: 'Productivity', active: false}, ]

    return (
        <>
            <div className='mx-auto w-[300px]'>
                <div className='mt-[40px] mb-[20px]'>Recommended Topics</div>
                <div className='mb-[20px]'><CategoryList categoryCardClassName='bg-gray-200 rounded-[15px] min-w-[30px] max-w-[200px] p-3 h-[35px] flex items-center justify-center'
                                                         category_list={category_list} className='flex flex-wrap gap-4'/></div>
                <span className='text-green-700 text-xs '>See more topics</span>

            </div>
        </>
    )
}

export default SideBar;