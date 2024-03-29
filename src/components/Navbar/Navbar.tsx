import React from 'react';
import CustomSearch from "../CustomSearch/CustomSearch";
import {EnvelopeIcon, NotificationIcon, UserIcon} from "../../Icons/Icons";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <>
          <div className='flex justify-between items-center px-2 h-[60px] border-b-[1px] border-b-gray-200 text-gray-500'>
              <div className='flex items-center w-[350px] justify-evenly'>
                  <span className='text-black'>NuEvents</span>
                  <CustomSearch/>
              </div>
              <div className='flex justify-evenly w-[240px] items-center'>
                  <Link to='/create-event'>Create Event</Link>
                  <EnvelopeIcon/>
                  <NotificationIcon/>
                  <UserIcon/>
              </div>
          </div>
        </>
    )
}

export default Navbar;