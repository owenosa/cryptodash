import React from 'react'
import {MonetizationOn } from '@material-ui/icons';

import Recent from './Recent';

import './LongBox.css';

function LongBox() {
    return (
        <div className="longBox">
            <h2>Recent Activity</h2>
            <div className="longbox_info">
                <h3>No Transactions Yet</h3>
                <MonetizationOn fontSize="large"/>
                <p>Trades will be displayed here on a real account!</p>
            </div>

        </div>
    )
}

export default LongBox
