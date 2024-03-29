import React,{ useState, useEffect } from 'react';
import {CategoryService} from "../../../service/Categories/CategoryService";
import CategoryList from "../../Authorization/Category/CategoryList";
import { Category } from '../../Authorization/Category/CategoryCard';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../stores/store";
import {message} from 'antd';
import {setCategories} from "../../../stores/slices/EventCreationSlice";
const arr = [6,12,18,24,30,36];

const EventCategories = () => {
    const selectedCategories = useSelector((state: RootState) => state.eventCreateStore.categories);
    const [categoriesData, setCategoriesData] = useState<Category[]>([]);
    const [selectCat, setSelectCat] = useState<number[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
       CategoryService.getCategories()
           .then((data)=> setCategoriesData(data.data.data.categories))

    }, []);

    useEffect(() => {
        console.log(selectCat)
        console.log("-----")
    }, [selectCat]);

    const handleSelectedCategories = (category: Category) => {
        if(selectCat.includes(category.id)){
            const arr = selectCat.filter(cat => cat !== category.id)
            setSelectCat(arr)
        }else{
            setSelectCat(prev => [...prev, category.id])
        }
        //setCategoriesData(prev => prev.map(prevCategory => category.id === prevCategory.id ? { ...prevCategory, active: !prevCategory.active } : prevCategory));
    }

    const handleCategoryList = (initVal: number, finalVal: number, index:number) => {
        const categorySlice = categoriesData.slice(initVal,finalVal);
        return (
            <div className='flex justify-center'>
                <CategoryList className={`flex justify-between w-full ${index % 2 === 0 ? 'ml-[30px]' : 'mr-[30px]'} `}
                              categoryCardClassName={`bg-gray-200 rounded-[15px] min-w-[30px] max-w-[800px] text-xl p-5 h-[35px] flex items-center justify-center`}
                              category_list={categorySlice}  onSelectCategory={handleSelectedCategories}/>

            </div>
        )
    }

    return (
        <>
            {selectedCategories}
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

/*




 */