import React, {useState} from 'react';
import category from "../Category1/Category";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../stores/store";
import {setCategories} from "../../../stores/slices/EventCreationSlice";

export interface Category {
    id: number;
    name: string;
    active: boolean;
    onSelect?: () => void;
    categoryCardClassName?: string;
}

const CategoryCard = (category: Category) => {
    const handleSelect = () => {
        if(category.onSelect){
            category.onSelect();
        }

    };

    return (
        <>
            <div className={category.categoryCardClassName} onClick={handleSelect}>
                {category.name}</div>
        </>
    )
}

export default CategoryCard;