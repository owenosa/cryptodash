import React from 'react';
import './AssetsBox.css';
import numeral from 'numeral'

function AssetsBox(props) {
    return (
        <div className="assetsBox">
            <h2>Assets</h2>
            <div id="assets">
                <div id="assets-header">
                    <h3>Currency</h3>
                    <h3>Total Units</h3>
                    <h3>Current Total</h3>
                </div>
                <div className="assets-input">
                    <img src={props.data[0].image} alt="asset"/>
                    <h3 className="assets-total">{props.bitcoinAssets}</h3>
                    <h3 className="assets-price">$ {numeral(props.data[0].current_price * props.bitcoinAssets).format("0,0.00")}</h3>
                </div>
                <div className="assets-input">
                    <img src={props.data[1].image} alt="asset" />
                    <h3 className="assets-total">{props.ethereumAssets}</h3>
                    <h3 className="assets-price">$ {numeral(props.data[1].current_price * props.ethereumAssets).format("0,0.00")}</h3>
                </div>
                <div className="assets-input">
                    <img src={props.data[10].image} alt="asset" />
                    <h3 className="assets-total">{props.stellarAssets}</h3>
                    <h3 className="assets-price">$ {numeral(props.data[10].current_price * props.stellarAssets).format("0,0.00")}</h3>
                </div>
                <div className="assets-input">
                    <img src={props.data[3].image} alt="asset" />
                    <h3 className="assets-total">{props.tetherAssets}</h3>
                    <h3 className="assets-price">$ {numeral(props.data[3].current_price * props.tetherAssets).format("0,0.00")}</h3>
                </div>
            </div>
        </div>
    )
}

export default AssetsBox
