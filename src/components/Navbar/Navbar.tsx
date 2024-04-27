import React, {useEffect, useState} from 'react';
import CustomSearch from "../CustomSearch/CustomSearch";
import {CommunityIcon, EnvelopeIcon, EventLibraryIcon, NotificationIcon, UserProfileIcon} from "../../Icons/Icons";
import {Link, useNavigate} from "react-router-dom";
import EventCreate from "../Event/EventCreation/EventCreate";
import {UserService} from "../../service/User/UserService";
import {useDispatch, useSelector} from "react-redux";
import {setCloseModal, setPageId} from "../../stores/slices/MainPageSlice";
import {RootState} from "../../stores/store";
import {LocalStorageUtil} from "../../utils/LocalStorageUtil";
import UserProfileUrl from "../User/UserProfileUrl";
import {refreshPage, TimeUtil} from "../../utils/TimeUtil";

interface NavbarProps {
    type: boolean;
}

const Navbar: React.FC<NavbarProps> = ({type}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.MainPageSlice.modal);
    const [userProfile, setUserProfile] = useState('');

    useEffect(() => {
        const getInfo = async () => {
            const {data} = await UserService.getAboutMe();
            setUserProfile(data.data.user.profileImage);
        }
        getInfo();
    }, []);

    const close = () => {
        if(modal){
            dispatch(setCloseModal(false));
        }
    }

    const open = () => {
        if(modal){
            dispatch(setCloseModal(false));
        }else{
            dispatch(setCloseModal(true));
        }
    }

    return (
        <>
          <div className='flex justify-between items-center px-2 h-[60px] border-b-[1px] border-b-gray-200 text-gray-500'>
              <div className='flex items-center w-[350px] justify-evenly'>
                  <span className='text-black' onClick={()=> {
                      navigate('/');
                      dispatch(setPageId(0));
                      close()
                  }}>NuEvents</span>
                  <CustomSearch/>
              </div>
              <div className={`flex justify-evenly ${type ? 'w-[240px]' : 'w-[200px]'} items-center`}>
                  {type && <>
                      <Link to='/create-event'>Create Event</Link>
                      <Link to='/chat'><EnvelopeIcon/></Link>
                  </>}
                  {!type && <EventCreate/>}
                  <NotificationIcon/>
                  <div onClick={()=> open()}>
                      <UserProfileUrl username={userProfile} width={32} height={32}/>
                  </div>
                  {modal && <UserModal/>}
              </div>
          </div>
        </>
    )
}

export default Navbar;

const UserModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.MainPageSlice.modal);

    const close = () => {
        if(modal){
            dispatch(setCloseModal(false));
        }else {
            dispatch(setCloseModal(true));
        }
    }
    return (
        <>
            <div className='absolute right-[10px] top-[55px] bg-white shadow-2xl w-[180px] z-10'>
                <div className='ml-[20px] mt-[20px] '>
                    <div className='flex gap-x-4 mb-[5px]'>
                        <UserProfileIcon/>
                        <div onClick={() => {
                            navigate('/me');
                            close();
                        }}>Profile</div>
                    </div>
                    <div className='flex gap-x-4 mb-[5px]' onClick={()=> {
                        navigate('/');
                        dispatch(setPageId(1));
                        close();
                    }}>
                        <EventLibraryIcon/>
                        <div>Event Library</div>
                    </div>
                    <div className='flex gap-x-4 mb-[10px]' onClick={()=> {
                        navigate('/');
                        dispatch(setPageId(2));
                        close();
                    }}>
                        <CommunityIcon/>
                        <div>Community</div>
                    </div>
                </div>
                <hr className='w-full'/>
                <div className='mb-[10px] text-center mt-[10px]'
                onClick={() => {
                    LocalStorageUtil.clearLocal();
                    navigate('/sign-in');
                    refreshPage();
                }}
                >Logout</div>
            </div>
        </>
    )
}