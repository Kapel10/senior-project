import React from 'react';
import CategoryList from "../Authorization/Category/CategoryList";
import {Category} from "../Authorization/Category/CategoryCard";
import UserProfileUrl from "../User/UserProfileUrl";


const SideBar = () => {
    const category_list: Category[] = [{id: 1, name: 'Technology', active: false}, {
        id: 2,
        name: 'Self Improvement',
        active: false
    },
        {id: 3, name: 'Writing', active: false}, {id: 4, name: 'Relationship', active: false}, {
            id: 5,
            name: 'Machine Learning',
            active: false
        }, {id: 6, name: 'Productivity', active: false},]

    return (
        <>
            <div className='mx-auto w-[300px]'>
                <div className='mt-[40px] mb-[20px]'>Recommended Topics</div>
                <div className='mb-[20px]'><CategoryList
                    categoryCardClassName='bg-gray-200 rounded-[15px] min-w-[30px] max-w-[200px] p-3 h-[35px] flex items-center justify-center'
                    category_list={category_list} className='flex flex-wrap gap-4'/></div>
                <span className='text-green-700 text-xs'>See more topics</span>
                <div className='mb-[10px] mt-[10px]'>Who to follow</div>
                <div className='flex items-center justify-between my-[10px] w-[260px]'>
                    <div className='flex items-center gap-x-1'>
                        <UserProfileUrl username='https://iso.500px.com/wp-content/uploads/2015/09/stock-photo-parks-and-squares-1012445728-3000x2000.jpg' width={40} height={40} />
                        <div className='mr-[10px] font-medium'>Marta Levchenko</div>
                    </div>
                    <button className='border-[1px] border-black w-[70px] rounded-2xl'>Follow</button>
                </div>
                <div className='flex items-center justify-between my-[10px] w-[260px]'>
                    <div className='flex items-center gap-x-1'>
                        <UserProfileUrl username='https://www.rri.res.in/sites/default/files/2022-09/Abhisek%20Tamang.jpg' width={40} height={40}/>
                        <div className='mr-[10px] font-medium'>Avi Siegel</div>
                    </div>
                    <button className='border-[1px] border-black w-[70px] rounded-2xl'>Follow</button>
                </div>
                <div className='flex items-center justify-between my-[10px] w-[260px]'>
                    <div className='flex items-center gap-x-1'>
                        <UserProfileUrl username='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPWa7bskLoUHEHDV1sgt6PZMZ6KeUZ8YxuW_93QUXQZQ&s' width={40} height={40}/>
                        <div className='mr-[10px] font-medium'>Jan Slort</div>
                    </div>
                    <button className='border-[1px] border-black w-[70px] rounded-2xl'>Follow</button>
                </div>
                <span className='text-green-700 text-xs my-[5px]'>See more suggestions</span>
            </div>
        </>
    )
}

export default SideBar;