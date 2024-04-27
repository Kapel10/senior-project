import React from 'react';
import {UserProp} from "../../pages/PersonPage";


interface PersonProp {
    user: UserProp;
}

const PersonMain: React.FC<PersonProp> = ({user}:PersonProp) => {

    return (
        <>
            <div className='text-4xl font-bold ml-[100px] mt-[60px]'>{user.user.firstname} {user.user.lastname}</div>
            <div
                className='relative flex justify-start border-b-[1px] border-b-gray-200 w-[730px] mx-auto h-[40px] mt-[50px] mb-[20px] gap-x-8'>
                <span>Hosting Events</span>
                <span>Created Events</span>
                <div
                    className={`w-[130px] top-[39px] left-0 bg-black absolute border-black border-[1px]`}>
                </div>
            </div>
        </>
    )


}

export default PersonMain;