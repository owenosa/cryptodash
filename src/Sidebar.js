import React from 'react'
import './Sidebar.css';
import { Announcement, ShowChart, AccountBalance, Adb } from '@material-ui/icons';


function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li className="logo"><Adb fontSize="large" color="primary"/></li>
                <li className="option"><Announcement fontSize="large"/></li>
                <li className="option active"><ShowChart fontSize="large"/></li>
                <li className="option"><AccountBalance fontSize="large"/></li>
            </ul>
        </div>
    )
}

export default Sidebar
