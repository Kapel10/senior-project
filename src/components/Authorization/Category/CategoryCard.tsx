import React from 'react';

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