import React from 'react';
import CategoryList from "../../Authorization/Category/CategoryList";
import { Category } from '../../Authorization/Category/CategoryCard';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../stores/store";
import {setCategoriesEvent} from "../../../stores/slices/EventCreationSlice";
const arr = [6,12,18,24,30,36];

const EventCategories = () => {
    const selectedCategories = useSelector((state: RootState) => state.eventCreateStore.categories);
    const dispatch = useDispatch();

    const handleSelectedCategories = (category: Category) => {
        if(selectedCategories.includes(category)){
            const updatedCategories = selectedCategories.map(cat =>
                cat.id === category.id ? { ...cat, active: !cat.active } : cat
            );
            dispatch(setCategoriesEvent(updatedCategories));
        }else{
            const arr = [...selectedCategories, category];
            dispatch(setCategoriesEvent(arr));
        }
    }

    const handleCategoryList = (initVal: number, finalVal: number, index:number) => {
        const categorySlice = selectedCategories.slice(initVal,finalVal);
        return (
            <div className='flex justify-center'>
                <CategoryList className={`flex justify-between w-full ${index % 2 === 0 ? 'ml-[30px]' : 'mr-[30px]'} `}
                              categoryCardClassName={`bg-gray-200 rounded-[15px] min-w-[30px] max-w-[800px] text-xl p-5 h-[35px] flex items-center justify-center}`}
                              category_list={categorySlice}  onSelectCategory={handleSelectedCategories}/>
            </div>
        )
    }

    return (
        <>
            <div className='mx-auto w-[1000px] font-inter'>
                <div className='w-full h-[40px] text-2xl border-b-[1px] border-b-gray-200'>Categories</div>
                <div className='flex flex-col gap-5 my-[30px]'>
                    {arr.map((value, index) => handleCategoryList(value - 6, value, index))}
                </div>
            </div>
        </>
    )
}

export default EventCategories;