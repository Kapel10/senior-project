import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar/Navbar";
import {
    CalendarIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    LocationIcon,
    PlusIcon,
    ReplyIcon,
    ShareIcon,
    TimeIcon, XMarkIcon
} from "../Icons/Icons";
import YandexMap from "../components/Map/YandexMap";
import CategoryList from "../components/Category/CategoryList";
import {Category} from "../components/Category/CategoryCard";
import {EventService} from "../service/Event/EventService";
import {extractHourAndMinutes, formatDateToMonthDay, Utils} from "../utils/Utils";
import UserProfilePhoto from "../components/User/UserProfilePhoto";
import UserProfileCard, {IUserCard} from "../components/User/UserProfileCard";
import {useNavigate, useParams} from "react-router-dom";
import EventPhoto from "../components/Event/EventPhoto";
import QRCode from "qrcode.react";
import {RootState} from "../stores/store";
import {useSelector} from "react-redux";

interface IMessagesList {
    commentId: number;
    parentId: number;
    text: string;
    author: {
        id: number;
        username: string,
        profileImage: null,
        "isEventAuthor": boolean
    },
    children: IMessagesList[],
    createdAt: Date
}

interface IEventPageResponse {
    categories: Category[]
    created_at: Date,
    description: string,
    followerCount: number,
    id: number,
    imageIds: undefined, // ?
    "price": number,
    images:  [
        {
            "id": number,
            "eventID": number,
            "url": string,
            "createdAt": string
        }
    ], // ?
    locations: [{
        address: string,
        archived: boolean,
        attendeesCount: number,
        endsAt: Date,
        eventID: number,
        id: number,
        latitude: number,
        longitude: number,
        seats: number,
        startsAt: Date,
    }]
    managers: [
        {
            "eventID": number,
            "user": {
                "id": number,
                "userId": number,
                "phone": string,
                "username": string,
                "firstname": string,
                "lastname": string,
                "profileImage": undefined,
                "dateOfBirth": Date,
                "preferences": undefined
            }
        }]
    maxAge: number,
    minAge: number,
    status: number,
    title: string,
}


const EventPage = () => {

    const {id} = useParams();
    const idNumber = id ? parseInt(id, 10) : -1;

    const [replyMessageId, setReplyMessageId] = useState(null);
    const [showReplies, setShowReplies] = useState<number[]>([]);
    const [message, setMessage] = useState('');
    const [messageReply, setMessageReply] = useState('');
    const [commentsList, setCommentsList] = useState<IMessagesList[]>([]);
    const [event, setEvent] = useState<IEventPageResponse>();
    const [userStatus, setUserStatus] = useState<boolean>();
    const [showParticipants, setShowParticipants] = useState<boolean>();

    const [showQr, setShowQr] = useState(false);
    const username = useSelector((state: RootState) => state.userSlice.username);

    const replyFunction = (commentId: any) => {
        if (commentId === replyMessageId) {
            setReplyMessageId(null);
        } else {
            setReplyMessageId(commentId);
        }
    }

    const showReply = (id: number) => {
        if (showReplies.includes(id)) {
            const arr = showReplies.filter(val => val !== id);
            setShowReplies(arr);
        } else {
            setShowReplies([...showReplies, id]);
        }
    }

    const postComment = () => {
        const request = {
            "eventId": idNumber,
            "text": message,
        }
        EventService.postComment(request)
            .then((data) => EventService.fetchComments(request)
                .then((data) => setCommentsList(data.data.data.comments))
                .catch((error) => console.log(error))).catch((error) => console.log(error));
        setMessage('');
    }

    const postReplyMessage = (parentId: number) => {
        const request = {
            "eventId": idNumber,
            "text": messageReply,
            "parentId": parentId
        }
        EventService.postComment(request)
            .then((data) => EventService.fetchComments(request)
                .then((data) => setCommentsList(data.data.data.comments))
                .catch((error) => console.log(error))).catch((error) => console.log(error));
        setMessageReply('');
        setReplyMessageId(null);
    }

    useEffect(() => {
        EventService.getEvent(idNumber).then((data) => setEvent(data.data.data)).catch((error) => console.log(error));
        const request = {
            'eventId': idNumber,
        }
        EventService.fetchComments(request).then((data) => setCommentsList(data.data.data.comments))
            .catch((error) => console.log(error));
        console.log(commentsList);
    }, []);


    useEffect(() => {
        console.log(event)
    }, [event]);


    const followEvent = async () => {
        if (!userStatus) {
            try {
                const response = await EventService.followEvent(idNumber);
                console.log(response);
                checkIfFollowed();
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await EventService.unFollowEvent(idNumber);
                console.log(response);
                checkIfFollowed();
            } catch (error) {
                console.log(error);
            }
        }
    }

    const checkIfFollowed = async () => {
        try {
            const response = await EventService.checkIfFollowed(idNumber);
            setUserStatus(response.data.data.follows);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        checkIfFollowed();
    }, []);


    const [qrCode, setQRCode] = useState<React.ReactNode>(null);


    const generateQR = (inputText: string, size: number) => {
        setQRCode(<QRCode value={inputText} size={size}/>);
    }

    const handleButtonClick = async() => {
        if(event) {
            const response =  await EventService.getTicket(event.id.toString());
            generateQR(response.data.data.ticket, 256);
        }

        setShowQr(prevState => !prevState);

        console.log('QR');
    };

    return (
        <>
            <Navbar type={true}/>
            {showParticipants && <Participants />}
            <div className='flex font-inter ml-[50px] mt-[30px]'>
                <div className='w-[60%] mx-[10px]'>
                    <div className='mb-5'><span className='text-4xl'>{event?.title}</span></div>
                    <div className='mb-7'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <div className='flex gap-x-4 mb-1'>
                                    <div className='flex gap-x-1'>
                                        <CalendarIcon/>{formatDateToMonthDay(event?.locations[0].startsAt)}</div>
                                    <div className='flex gap-x-1'>
                                        <TimeIcon/> {extractHourAndMinutes(event?.locations[0].startsAt)} - {extractHourAndMinutes(event?.locations[0].endsAt)}
                                    </div>
                                </div>
                                <div className='flex gap-x-1'>
                                    <LocationIcon/> {event?.locations[0].address}
                                </div>
                            </div>
                            <div>
                                {event?.price !== undefined && event?.price !== 0 && <>
                                    <div className='flex items-center gap-x-4 mb-[5px]'>Price:
                                        <div
                                            className='bg-gray-200 rounded-[15px] min-w-[80px] flex justify-center items-center h-[30px]'> {event?.price}
                                        </div>
                                    </div>
                                </>}
                                {event?.locations[0].seats && <>
                                    <div className='flex items-center gap-x-4'>Seats: <div
                                        className='bg-gray-200 rounded-[15px] min-w-[60px] flex justify-center items-center h-[30px]'>{event.locations[0].seats}
                                    </div></div>
                                </>}

                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center mb-7'>
                        <div className='flex items-center gap-x-2'>
                              {event?.managers && event?.managers.length > 0 && event?.managers[0].user && <UserProfilePhoto username={event?.managers[0].user.username} width={40} height={40}/>}

                            <div>{event?.managers[0].user.firstname} {event?.managers[0].user.lastname}</div>
                        </div>
                        <div
                            onClick={() => setShowParticipants(prevState => !prevState)}
                            className='bg-gray-200 rounded-[15px] w-[130px] flex justify-center items-center h-[30px]'>Participants
                        </div>
                    </div>
                    <div className='text-justify mb-[10px]'>
                        {event?.description}
                    </div>
                    {event?.minAge && <div className='flex items-center gap-x-2'>

                        <span>Age:</span>
                        <div
                            className='bg-gray-200 rounded-[15px] w-[40px] flex justify-center items-center h-[30px]'>{event.minAge}
                        </div>
                        {event?.maxAge && <>
                            <span> - </span>
                            <div
                                className='bg-gray-200 rounded-[15px] w-[40px] flex justify-center items-center h-[30px]'>{event.maxAge}
                            </div>
                        </>}

                    </div>}

                    <div className='mt-[20px]'>
                        <div className='flex justify-between items-center mb-[10px]'>
                            <span className='text-3xl'>Comments </span>
                            <span className='text-gray-400'>{commentsList && commentsList.length} comments</span>
                        </div>
                        <div className='flex gap-x-2 items-center'>
                            <UserProfilePhoto username={username} width={40} height={40}/>
                            <div
                                className='w-[800px] h-[50px] border-gray-200 border-[1px] relative shadow-md rounded-[10px]'>
                                <input className='w-full h-full outline-none rounded-[10px] pl-[14px]'
                                       value={message}
                                       onChange={(e) => setMessage(e.target.value)}
                                       placeholder='Join the discussion'/>
                                <div
                                    onClick={postComment}
                                    className='absolute bg-green-500 rounded-[12px] text-white w-[150px] h-[30px] flex justify-center items-center right-[10px] top-[10px]'>Add
                                    comment
                                </div>
                            </div>
                        </div>
                        <div className='mt-[10px]'>
                            {commentsList && commentsList.length > 0 && commentsList.map(comment => (
                                <div>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex h-[50px] items-center gap-x-2'>
                                            <UserProfilePhoto username={comment.author.username} width={40}
                                                              height={40}/>
                                            <div>
                                                <div className='text-sm'>{comment.author.username}</div>
                                                <div
                                                    className='text-sm text-gray-400'>{comment.author.isEventAuthor ? <> Hoster
                                                    | {Utils(comment.createdAt)} </> : <>  {Utils(comment.createdAt)} </>}</div>
                                            </div>
                                        </div>
                                        <div className='flex gap-x-1 text-sm'
                                             onClick={() => replyFunction(comment.commentId)}>
                                            <ReplyIcon/>
                                            <div>Reply</div>
                                        </div>
                                    </div>
                                    <div key={comment.commentId} className='w-[600px] mb-[5px] ml-[50px]'>
                                        {comment.text}
                                    </div>
                                    {replyMessageId === comment.commentId &&
                                        <>
                                            <div className='flex gap-x-2 ml-[50px] my-[5px]'>
                                                <UserProfilePhoto username={username} width={40}
                                                                  height={40}/>
                                                <div
                                                    className='w-[750px] h-[50px] border-gray-200 border-[1px] relative shadow-md rounded-[10px]'>
                                                    <input
                                                        value={messageReply}
                                                        onChange={(e) => setMessageReply(e.target.value)}
                                                        className='w-full h-full outline-none rounded-[10px] pl-[14px]'
                                                        placeholder={`Reply to ${comment.author.username}`}/>
                                                    <div
                                                        onClick={() => postReplyMessage(comment.commentId)}
                                                        className='absolute bg-green-500 rounded-[12px] text-white w-[150px] h-[30px] flex justify-center items-center right-[10px] top-[10px]'>Add
                                                        comment
                                                    </div>
                                                </div>
                                            </div>
                                        </>}
                                    {comment.children && comment.children.length > 0 &&
                                        <div className='text-sm text-blue-600 ml-[75px] mb-[5px] flex items-center '
                                             onClick={() => showReply(comment.commentId)}
                                        >
                                            <div
                                                className='flex items-center gap-x-1'>{showReplies.includes(comment.commentId) ? <>
                                                    <ChevronUpIcon/>
                                                    <span>Hide replies</span>
                                                </> :
                                                <>
                                                    <ChevronDownIcon/>
                                                    <span>{comment.children.length} replies</span>
                                                </>
                                            }</div>
                                        </div>
                                    }
                                    {showReplies.includes(comment.commentId) && <div className='ml-[50px]'>
                                        {comment.children && comment.children.length > 0 && comment.children.map(value => (
                                            <>
                                                <div className='flex justify-between items-center mb-[5px]'>
                                                    <div className='flex h-[50px] items-center gap-x-2'>
                                                        <UserProfilePhoto username={value.author.username} width={40} height={40} />
                                                        <div>
                                                            <div className='text-sm'>{value.author.username}</div>
                                                            <div
                                                                className='text-sm text-gray-400'>{value.author.isEventAuthor ? <> Hoster
                                                                | {Utils(comment.createdAt)} </> : <>  {Utils(comment.createdAt)} </>}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div key={value.commentId} className='w-[600px] mb-[15px] ml-[50px]'>
                                                    {value.text}
                                                </div>
                                            </>
                                        ))}
                                    </div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-[40%] flex flex-col items-center gap-y-4'>
                    <div className='flex w-full justify-between'>
                        <div className='flex w-[100px] gap-x-1 justify-between items-center ml-[70px]'>
                            <ShareIcon/>
                            <span className='text-2xl font-light'>Share</span>
                        </div>
                        <div className={`flex w-[300px] gap-x-4 items-center ${!userStatus ? ' justify-end' : ''} `}>
                            {userStatus === true ? <span className='text-2xl font-light' onClick={handleButtonClick}>Show QR</span> : <></>}
                            <div className='flex gap-x-1 items-center'  onClick={followEvent}>
                                {userStatus === true ? <XMarkIcon/> : <PlusIcon/>}
                                {userStatus === true ? <span className='text-2xl font-light'>Unjoin</span> :
                                    <span className='text-2xl font-light mr-[90px]'>Join</span>}
                            </div>
                        </div>
                    </div>

                    {event?.images && <EventPhoto url={event?.images[0]?.url} width={400} height={400} rounded={true}/>}
                    <span className='text-xl '>Event Location</span>
                    <YandexMap x={400} y={400} lat={event?.locations[0].latitude} lg={event?.locations[0].longitude}
                               showUser={false}/>
                    <span className='text-xl '>Tags</span>
                    <div className='mb-[20px]'>
                        <CategoryList
                            categoryCardClassName='bg-gray-200 rounded-[15px] min-w-[30px] max-w-[200px] p-3 h-[35px] flex items-center justify-center'
                            category_list={event?.categories ?? []} className='flex flex-wrap gap-4'/>
                    </div>
                    {showQr && <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                        <div className='bg-black bg-opacity-50 p-5 rounded-lg'>
                            <div className='mb-3 text-white text-xl text-center'>QR Code</div>
                            {qrCode && (
                                <div
                                    className='w-96 h-96 bg-white p-3 rounded-md shadow-md flex justify-center items-center'>
                                    {qrCode}
                                </div>
                            )}
                        </div>
                    </div>
                    }
                </div>
            </div>

        </>
    )
}

export default EventPage;


const Participants = () => {
    const {id} = useParams(); // Get the ID from route parameters

    // Parse the ID to a number if it's defined
    const idNumber = id ? parseInt(id, 10) : -1;

    const [followersList, setFollowersList] = useState<IUserCard[]>([]);

    const getFollowers = async () => {
        try {
            const response = await EventService.getFollowersList(idNumber);
            setFollowersList(response.data.data.followers);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFollowers();
    }, []);



    return (
        <div className='flex justify-center items-center'>
            <div
                className='w-[300px] top-1/2 flex z-10 flex-col fixed items-center mx-auto bg-white shadow-2xl pt-[20px] pb-[20px]'>
                <div className='text-center text-xl mb-[10px]'>Participants</div>
                <div className='flex flex-col items-center gap-y-3'>
                    {followersList && followersList.map(follower => (
                        <UserProfileCard username={follower.username} userId={follower.userId}/>
                    ))}
                </div>
            </div>
        </div>

    )
}

