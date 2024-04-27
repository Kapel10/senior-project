import React, {useEffect, useState} from 'react';
import {SearchIcon} from "../../Icons/Icons";
import {UserService} from "../../service/User/UserService";
import CommunityPage from "./CommunityPage";
import UserProfileUrl from "./UserProfileUrl";
import {useNavigate} from "react-router-dom";

const Community = () => {

    const [usersList, setUsersList] = useState<UsersList[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const getUsers = async (username: string) => {
        try{
            const response = await UserService.getUsersList(username);
            const users = response.data.data.users;
            if (users !== null) {
                setUsersList(users);
            } else {
                setUsersList([]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getInfo = async () => {
            const {data} = await UserService.getAboutMe();
            setUsername(data.data.user.username);
        }
        getInfo();
    }, []);

    useEffect(() => {
        getUsers(inputValue);
    }, [inputValue]);

    return (
        <>
            <div className='relative'>
                <div className='text-4xl font-bold ml-[100px] mt-[40px]'>Community</div>
                <div className='flex ml-[100px] gap-x-4 mt-[50px]'>
                    <div className='w-[350px]'>
                        <div className='relative'>
                            <input type='text'
                                   value={inputValue}
                                   onChange={handleInputChange}
                                   className='border-[1px] border-select-green w-[250px] h-[45px] text-lg outline-none rounded-[5px] pl-10 relative'
                                   placeholder='Find new friends'/>
                            <div className='absolute left-2 top-2'><SearchIcon/></div>
                            {inputValue !== '' && usersList && usersList.length > 0 && <div className='bg-white absolute overflow-y-auto'>
                                {usersList?.filter(user => user.username !== username).map(user => (
                                    <>
                                        <div
                                            key={user.userId}
                                            onClick={() => navigate(`/user/${user.username}`)}
                                            className='cursor-pointer hover:bg-gray-100 pl-3 gap-x-3 w-[250px] flex items-center h-[45px] border-[1px] border-solid'>
                                            <UserProfileUrl username={user.profileImage} width={40} height={40}/>
                                            {user.username}
                                        </div>
                                    </>
                                ))}
                            </div>}
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <CommunityPage/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Community;

interface UsersList {
    userId: number;
    username: string;
    profileImage: string;
}

