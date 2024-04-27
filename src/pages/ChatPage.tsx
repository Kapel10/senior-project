import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar/Navbar";
import {SearchIcon} from "../Icons/Icons";
import ChatComponent from "../components/Chat/ChatComponent";
import {UserService} from "../service/User/UserService";
import {useSelector} from "react-redux";
import {RootState} from "../stores/store";
import UserProfilePhoto from "../components/User/UserProfilePhoto";
import {EventService} from "../service/Event/EventService";
import EventPhoto from "../components/Event/EventPhoto";

interface LastChat {
    eventId : number

    images : string[],
    lastMessage : {id: number, eventId: number, userId: number, username: string, profileImage: string, message: string}
    title : string

}

const ChatPage = () => {

    const remainingHeight = `calc(100vh - 60px)`;

    const [id, setId] = useState(-1);
    const [selectedChatId, setSelectedChatId] = useState(-1);

    const [chats, setChats] = useState<LastChat[]>([]);

    const username = useSelector((state: RootState) => state.userSlice.username);
    const firstName = useSelector((state: RootState) => state.userSlice.firstname);
    const lastName = useSelector((state: RootState) => state.userSlice.lastname);

    const chatHeight = `calc(100vh - 150px)`;

    const getChats = async () => {
        try{
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


    return(
        <>
            <Navbar type={true}/>
            <div className='flex font-inter' style={{ height: remainingHeight }}>
                <div className='w-[30%] '>
                    <div className='flex items-center gap-x-3 mt-[20px] mb-[20px] ml-[50px]'>
                        <UserProfilePhoto username={username} width={50} height={50} />
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
                            <div onClick={()=> setId(chat.eventId)}>
                                <div className='flex items-center gap-x-3 my-[10px] ml-[50px]'>
                                    {chat.images && chat.images.length > 0 && (
                                        <EventPhoto url={chat.images[0]} width={80} height={80} rounded={false} />
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
                <div className='w-[1%] border-r-[1px] border-r-gray-200'></div>
                <div className='w-[69%] relative bg-blue-50'>
                    {id !== -1 &&  <ChatComponent id={id}/>}
                </div>
            </div>
        </>
    )

}

export default ChatPage;
/*

<div className='border-[1px] border-solid overflow-auto' style={{ height: chatHeight }}>
                        {messeges.map(message => (
                            <div className={`flex ${message.id === 1 ? 'justify-start': 'justify-end'} my-[30px]`}>
                                {message.name}
                            </div>
                        ))}
                    </div>
                    <div className='absolute bottom-10 left-[100px]'>
                        <div className='flex justify-center items-center relative'>
                            <div className='relative flex items-center'>
                                <div className='absolute left-4'><SearchIcon/></div>
                                <input className='outline-none bg-white rounded-[30px] w-[800px] pl-[55px] py-3'
                                       placeholder='Message'/>
                            </div>
                        </div>
                    </div>
 */