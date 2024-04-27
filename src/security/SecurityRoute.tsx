import React from 'react';
import {LocalStorageUtil} from "../utils/LocalStorageUtil";
import {Navigate, Outlet} from 'react-router-dom'


const SecurityRoute = ( ) =>{

    const checkSecurity = () => {
        let flag = false;
        const jwt = LocalStorageUtil.getJWTToken();
        if (jwt && jwt !== '') {
            flag = true;
        }
        return flag;

    }

    return (
        checkSecurity() ? <Outlet/> : <Navigate to='/sign-in'/>
    )
}

export default SecurityRoute;