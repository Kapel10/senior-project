import React, {useState} from 'react';
import category from "../Category1/Category";

export interface Category {
    id: number;
    name: string;
    active?: boolean;
    onSelect?: () => void;
    categoryCardClassName?: string;
}

const CategoryCard = (category: Category) => {
    const [active, setActive] = useState(true);
    const handleSelect = () => {
        setActive(prev => !prev);
        if(category.onSelect){
            category.onSelect()
        }

    };


    const cardStyle = {
        backgroundColor: active ? 'lightgray' : 'lightgreen',
    };
    return (
        <>
            {active}
            <div className={category.categoryCardClassName} onClick={handleSelect} style={cardStyle}>
                {category.name}</div>
        </>
    )
}

export default CategoryCard;