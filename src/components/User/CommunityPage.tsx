import React, {useState} from 'react';
import FollowedPeople from "../Community/FollowedPeople";
import Followers from "../Community/Followers";


const CommunityPage = () => {

    const [id, setId] = useState(1);

    const Page = () => {
        switch (id) {
            case 1:
                return <FollowedPeople/>
            case 2:
                return <Followers/>
            default:
                return <FollowedPeople/>
        }
    }
    return (
        <>
            <div
                className='relative flex justify-evenly border-b-[1px] border-b-gray-200 w-[460px] mx-auto h-[40px] mb-[30px] gap-x-8'>
                <span onClick={() => setId(1)}>Followed People</span>
                <span onClick={() => setId(2)}>Followers</span>
                <div
                    className={` ${id === 1 ? 'w-[230px] top-[39px] left-0' : 'top-[39px] w-[230px] left-[230px]'} bg-black absolute border-black border-[1px]`}>
                </div>
            </div>
            <div className='flex'>
                <Page/>
            </div>
        </>

    )


}

export default CommunityPage;