import React from 'react';
import CategoryCard, {Category} from "./CategoryCard";

interface CategoryListProps {
    category_list: Category[];
    onSelectCategory?: (category: Category) => void;
    className: string;
    categoryCardClassName: string;
}
const CategoryList = ({ category_list, onSelectCategory, className, categoryCardClassName}: CategoryListProps) => {
    const handleSelect = (category: Category) => {
        if(onSelectCategory) {
            onSelectCategory(category)
        }
    }
    return (
        <>
            <div className={className} >
                {category_list.map((category: Category) => <CategoryCard categoryCardClassName={categoryCardClassName} id={category.id} key={category.id} name={category.name}
                                                                       onSelect={()=> onSelectCategory ? handleSelect(category)  : null}  />)}
            </div>
        </>
    )
}

export default CategoryList;

//()=> onSelectCategory ? handleSelect(category)  : null