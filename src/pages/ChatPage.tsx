import React, {useState} from 'react';
import Navbar from "../components/Navbar/Navbar";
import ChatComponent from "../components/Chat/ChatComponent";
import ChatSideBar from "../components/Chat/ChatSideBar";

const ChatPage = () => {

    const [id, setId] = useState(-1);

    const remainingHeight = `calc(100vh - 60px)`;


    const changeChatId = (id: number) => {
        setId(id);
    }

    return(
        <>
            <Navbar type={true}/>
            <div className='flex font-inter' style={{ height: remainingHeight }}>
                <div className='w-[30%] '>
                    <ChatSideBar setId={changeChatId}/>
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
