import React from 'react'
import './SmallBox.css';
import numeral from 'numeral'

function BalanceBox(props) {
    return (
        <div id={props.id} className="smallBox">
            <div className="smallBox_info">
                <img className="smallBox-icon" src={props.image} alt={props.symbol}/>
                <h2>{props.title}</h2>
            </div>
            
            <div className="smallBox_numbers">
                <h1 className="smallBox-price">$ {numeral(props.currentPrice).format('0,0.00')}</h1>
                <h5 className="smallBox-roc"></h5>
            </div>
            
            <div className="smallBox_graph">
                
            </div>
        </div>
    )
}

export default BalanceBox
