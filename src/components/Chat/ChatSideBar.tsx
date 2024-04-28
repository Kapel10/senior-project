import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../stores/store";
import {EventService} from "../../service/Event/EventService";
import UserProfilePhoto from "../User/UserProfilePhoto";
import {SearchIcon} from "../../Icons/Icons";
import EventPhoto from "../Event/EventPhoto";

interface LastChat {
    eventId : number
    images : string[],
    lastMessage : {id: number, eventId: number, userId: number, username: string, profileImage: string, message: string}
    title : string

}

interface Props {
    setId: (id:number) => void;
}

const ChatSideBar: React.FC<Props> = ({setId}: Props) => {

    const [chats, setChats] = useState<LastChat[]>([]);

    const username = useSelector((state: RootState) => state.userSlice.username);
    const firstName = useSelector((state: RootState) => state.userSlice.firstname);
    const lastName = useSelector((state: RootState) => state.userSlice.lastname);


    const getChats = async () => {
        try {
            const response = await EventService.getChats();
            console.log(response)
            setChats(response.data.data.chatInfo);
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getChats();
    }, []);


    return (
        <div>
            <div className='flex items-center gap-x-3 mt-[20px] mb-[20px] ml-[50px]'>
                <UserProfilePhoto username={username} width={50} height={50}/>
                <div className=''>
                    <div className='text-xl'>{firstName} {lastName}</div>
                    <div className='font-bold'>@{username} </div>
                </div>
            </div>
            <div className='flex justify-center items-center relative mb-[20px]'>
                <div className='relative flex items-center'>
                    <div className='absolute left-4'><SearchIcon/></div>
                    <input className='outline-none bg-select-gray rounded-[30px] w-[350px] pl-[55px] py-3'
                           placeholder='Search'/>
                </div>
            </div>
            <div className='w-[400px] h-[1px] border-[1px] bg-select-gray mx-auto'></div>
            <div className='flex flex-col'>
                {chats.map(chat => (
                    <div onClick={() => setId(chat.eventId)}>
                        <div className='flex items-center gap-x-3 my-[10px] ml-[50px]'>
                            {chat.images && chat.images.length > 0 && (
                                <EventPhoto url={chat.images[0]} width={80} height={80} rounded={false}/>
                            )}
                            <div className=''>
                                <div className='text-xl'>{chat.title}</div>
                                <div className=''>{chat.lastMessage.message}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatSideBar;