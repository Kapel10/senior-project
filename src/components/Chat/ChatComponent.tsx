import React, {useState, useEffect, useRef} from 'react';
import {LocalStorageUtil} from '../../utils/LocalStorageUtil';
import {EventService} from "../../service/Event/EventService";
import UserProfilePhoto from "../User/UserProfilePhoto";


interface IChatInterface {
    createdAt: string
    eventId: number
    id: number
    isMy: boolean
    message: string
    profileImage: string
    userId: number
    username: string
}

interface ChatProp{
    id: number
}

const ChatComponent: React.FC<ChatProp> = ({id}) => {
    const [messages, setMessages] = useState<IChatInterface[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const chatHeight = `calc(100vh - 150px)`;

    useEffect(() => {
        getMessages();
        const token = LocalStorageUtil.getJWTToken();
        if (!token) {
            return;
        }

        const ws = new WebSocket(`ws://104.248.4.202:8080/ws/${id}?token=${token}`);
        setSocket(ws);

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            const newMessage = event.data;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            console.log('Received message:', newMessage);
            getMessages();
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
                ws.close();
            }
        };
    }, [id]);

    const getMessages = async() => {
        try{
            const response = await EventService.getMessages(id.toString());
            setMessages(response.data.data.messages);
            console.log(response)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect( ()=>  {
        getMessages();
    }, [inputMessage])

    const sendMessage = () => {
        console.log('Attempting to send message...');
        if (socket && socket.readyState === WebSocket.OPEN && inputMessage.trim() !== '') {
            console.log('Sending message:', inputMessage);
            socket.send(inputMessage);
            setInputMessage('');
        } else {
            console.log('WebSocket is not open or input message is empty.');
        }
    };
    const divRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };
    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    }, [messages]);
    return (
        <>
            <div className='overflow-auto relative' ref={divRef} style={{height: chatHeight}}>
                <div>
                    {messages && messages.length > 0 && messages.slice(0).reverse().map((message) => (
                        <div className='my-[2px]'>
                            {!message.isMy && (
                                <div key={message.createdAt} className='flex items-center gap-x-1 ml-[5px]'>
                                    <div>
                                        <UserProfilePhoto username={message.username} width={45} height={45}/>
                                    </div>
                                    <div className='flex flex-col bg-white rounded-2xl p-1 min-w-[50px]'>
                                        <div className='text-red-500 ml-1'>{message.username}</div>
                                        <div className='px-1'>{message.message}</div>
                                    </div>
                                </div>
                            )}
                            {message.isMy && (
                                <div key={message.createdAt} className='flex justify-end mr-[5px]'>
                                    <div className='flex flex-col bg-white rounded-2xl p-1 min-w-[50px]'>
                                        <div className='text-green-500 ml-1'>You</div>
                                        <div className='px-1'>{message.message}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className='absolute bottom-4 flex items-center left-[100px]'>
                <div className='flex items-center'>
                    <input className='outline-none bg-white rounded-[20px] w-[800px] pl-[15px] py-4'
                           value={inputMessage}
                           onKeyDown={handleKeyDown}
                           onChange={(e) => setInputMessage(e.target.value)}
                           placeholder='Message....'/>
                </div>
            </div>
        </>

    );
};

export default ChatComponent;
