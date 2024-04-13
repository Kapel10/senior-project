import React from 'react';
import CustomSearch from "../CustomSearch/CustomSearch";
import {EnvelopeIcon, NotificationIcon} from "../../Icons/Icons";
import { Link } from "react-router-dom";
import EventCreate from "../Event/EventCreation/EventCreate";

interface NavbarProps {
    type: boolean;
}
const Navbar: React.FC<NavbarProps> = ({type}) => {
    return (
        <>
          <div className='flex justify-between items-center px-2 h-[60px] border-b-[1px] border-b-gray-200 text-gray-500'>
              <div className='flex items-center w-[350px] justify-evenly'>
                  <Link to='/'><span className='text-black'>NuEvents</span></Link>
                  <CustomSearch/>
              </div>
              <div className={`flex justify-evenly ${type ? 'w-[240px]' : 'w-[200px]'} items-center`}>
                  {type && <>
                      <Link to='/create-event'>Create Event</Link>
                      <EnvelopeIcon/>
                  </>}
                  {!type && <EventCreate/>}
                  <NotificationIcon/>
                  <div className='w-[32px] h-[32px] bg-red-100 rounded-3xl'></div>
              </div>
          </div>
        </>
    )
}

export default Navbar;