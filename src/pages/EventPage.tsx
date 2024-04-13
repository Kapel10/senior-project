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
    TimeIcon
} from "../Icons/Icons";
import YandexMap from "../components/Map/YandexMap";
import CategoryList from "../components/Authorization/Category/CategoryList";
import {Category} from "../components/Authorization/Category/CategoryCard";
import {EventService} from "../service/Event/EventService";
import {extractHourAndMinutes, formatDateToMonthDay, TimeUtil} from "../utils/TimeUtil";

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
    categories : Category[]
    created_at: Date,
    description : string,
    followerCount : number,
    id : number,
    imageIds : undefined, // ?
    images : undefined, // ?
    locations : [{
        address: string,
        archived : boolean,
        attendeesCount : number,
        endsAt : Date,
        eventID : number,
        id : number,
        latitude : number,
        longitude : number,
        seats : number,
        startsAt : Date,
    }]
    managers : [
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
        } ]
    maxAge : number,
    minAge : number,
    status : number,
    title : string,
}


const EventPage = () => {

    const [replyMessageId, setReplyMessageId] = useState(null);
    const [showReplies, setShowReplies] = useState<number[]>([]);
    const [message, setMessage] = useState('');
    const [messageReply, setMessageReply] = useState('');
    const [commentsList, setCommentsList] = useState<IMessagesList[]>([]);
    const [event, setEvent] = useState<IEventPageResponse>();

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
            "eventId": 4,
            "text": message,
        }
        EventService.postComment(request)
            .then((data) => EventService.fetchComments(request)
                .then((data) => setCommentsList(data.data.data.comments))
                .catch((error) => console.log(error))).catch((error) => console.log(error));
        setMessage('');
    }

    const postReplyMessage = (id: number) => {
        const request = {
            "eventId": 4,
            "text": messageReply,
            "parentId": id
        }
        EventService.postComment(request)
            .then((data) => EventService.fetchComments(request)
                .then((data) => setCommentsList(data.data.data.comments))
                .catch((error) => console.log(error))).catch((error) => console.log(error));
        setMessageReply('');
        setReplyMessageId(null);
    }

    useEffect(() => {
        EventService.getEvent(4).then((data) => setEvent(data.data.data)).catch((error) => console.log(error));
        const request = {
            'eventId': 4,
        }
        EventService.fetchComments(request).then((data) => setCommentsList(data.data.data.comments))
            .catch((error) => console.log(error));
        console.log(commentsList);
    }, []);


    useEffect(() => {
        console.log(event)
    }, [event]);

    return (
        <>
            <Navbar type={true}/>
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
                                <div className='flex items-center gap-x-4 mb-[5px]'>Price:
                                    <div
                                        className='bg-gray-200 rounded-[15px] min-w-[80px] flex justify-center items-center h-[30px]'> 1000
                                    </div>
                                </div>
                                <div className='flex items-center gap-x-4'>Seats: <div
                                    className='bg-gray-200 rounded-[15px] min-w-[60px] flex justify-center items-center h-[30px]'>500
                                </div></div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center mb-7'>
                        <div className='flex items-center gap-x-2'>
                            <div className='w-[40px] h-[40px] bg-red-100 rounded-3xl'></div>
                            <div>{event?.managers[0].user.firstname} {event?.managers[0].user.lastname}</div>
                        </div>
                        <div
                            className='bg-gray-200 rounded-[15px] w-[130px] flex justify-center items-center h-[30px]'>Participants
                        </div>
                    </div>
                    <div className='text-justify mb-[10px]'>
                        {event?.description}
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <span>Age:</span>
                        <div
                            className='bg-gray-200 rounded-[15px] w-[40px] flex justify-center items-center h-[30px]'>13
                        </div>
                        <span> - </span>
                        <div
                            className='bg-gray-200 rounded-[15px] w-[40px] flex justify-center items-center h-[30px]'>60
                        </div>
                    </div>
                    <div className='mt-[20px]'>
                        <div className='flex justify-between items-center mb-[10px]'>
                            <span className='text-3xl'>Comments</span>
                            <span className='text-gray-400'>{commentsList.length} comments</span>
                        </div>
                        <div className='flex gap-x-2 items-center'>
                            <div className='w-[40px] h-[40px] bg-red-100 rounded-3xl'></div>
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
                                            <div className='w-[40px] h-[40px] bg-red-100 rounded-3xl'></div>
                                            <div>
                                                <div className='text-sm'>{comment.author.username}</div>
                                                <div
                                                    className='text-sm text-gray-400'>{comment.author.isEventAuthor ? <> Hoster
                                                    | {TimeUtil(comment.createdAt)} </> : <>  {TimeUtil(comment.createdAt)} </>}</div>
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
                                                <div className='w-[40px] h-[40px] bg-red-100 rounded-3xl'></div>
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
                                                        <div
                                                            className='w-[40px] h-[40px] bg-red-100 rounded-3xl'></div>
                                                        <div>
                                                            <div className='text-sm'>{value.author.username}</div>
                                                            <div
                                                                className='text-sm text-gray-400'>{comment.author.isEventAuthor ? <> Hoster
                                                                | {TimeUtil(comment.createdAt)} </> : <>  {TimeUtil(comment.createdAt)} </>}</div>
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
                    <div className='flex w-full justify-evenly'>
                        <div className='flex w-[100px] gap-x-1 items-center'>
                            <ShareIcon/>
                            <span className='text-2xl font-light'>Share</span>
                        </div>
                        <div className='flex w-[100px] gap-x-1 items-center'>
                            <PlusIcon/>
                            <span className='text-2xl font-light'>Join</span>
                        </div>
                    </div>
                    <div className='w-[400px] h-[400px] bg-gray-100'>
                    </div>
                    <span className='text-xl '>Event Location</span>
                    <YandexMap x={400} y={400} lat={event?.locations[0].latitude} lg={event?.locations[0].longitude} showUser={false}/>
                    <span className='text-xl '>Tags</span>
                    <div className='mb-[20px]'>
                        <CategoryList
                            categoryCardClassName='bg-gray-200 rounded-[15px] min-w-[30px] max-w-[200px] p-3 h-[35px] flex items-center justify-center'
                            category_list={event?.categories ?? []} className='flex flex-wrap gap-4'/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventPage;


/*


 */