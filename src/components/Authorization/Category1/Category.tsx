import React from "react";

interface CategoryProps {
    category: any,
    isSelected: boolean,
    onClick: () => void,
}

const Category: React.FC<CategoryProps> = ({category, isSelected, onClick}) => {
    console.log(isSelected, category.id)
    return (
        <div key={category.id}
             onClick={onClick}
             className={`w-[130px] rounded-2xl h-[50px] ${isSelected ? 'bg-white': 'bg-slate-300'} flex items-center justify-evenly px-4`}>
            {category.name}
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5}
                 stroke='currentColor' className='w-3 h-3'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15'/>
            </svg>
        </div>
    )
}
export default Category;