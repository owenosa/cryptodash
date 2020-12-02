import React, {useEffect} from 'react'
import './HorzBox.css';
import numeral from 'numeral'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

function HorzBox(props, {buy}) {

    function unitsChange(e){
        props.setInputNum(parseInt(e.target.value))
    }

    function buyOrSell(e){
        if(e.target.innerText === "Buy"){
            props.setBuy(true)
        } else {
            props.setBuy(false)
        }
    }

    function currentCoin(e){
        if(e.target.options.selectedIndex === 1){
            props.setSelectedCoin('bitcoin');
            props.setPrice(props.bitcoinPrice)
        } else if(e.target.options.selectedIndex === 2){
            props.setSelectedCoin('ethereum');
            props.setPrice(props.ethereumPrice)
        } else if(e.target.options.selectedIndex === 3){
            props.setSelectedCoin('stellar');
            props.setPrice(props.stellarPrice)
        } else if(e.target.options.selectedIndex === 4){
            props.setSelectedCoin('tether');
            props.setPrice(props.tetherPrice)
        }
    }

    function confirm(e){
        e.preventDefault()
        if(props.buy){
            if(props.currentBalance < (props.price * props.inputNum)){
                document.getElementById('inputBox').style.outlineColor = "red"
                document.getElementById('inputBox').style.border = "3px solid red"
            } else {
                if(props.selectedCoin === "bitcoin"){
                    props.setBitcoinAssets(props.inputNum + props.bitcoinAssets)
                } else if (props.selectedCoin === "ethereum"){
                    props.setEthereumAssets(props.inputNum + props.ethereumAssets)
                } else if (props.selectedCoin === "stellar"){
                    props.setStellarAssets(props.inputNum + props.stellarAssets)
                } else if (props.selectedCoin === "tether"){
                    props.setTetherAssets(props.inputNum + props.tetherAssets)
                }
                props.setCurrentBalance(props.currentBalance - (props.price * props.inputNum))
                document.getElementById('inputBox').style.outlineColor = "blue"
                document.getElementById('inputBox').style.border = "1px solid grey"
            }
        } else if (!props.buy) {
            if(props.selectedCoin === "bitcoin" && props.bitcoinAssets < props.inputNum){
                document.getElementById('inputBox').style.outlineColor = "red"
                document.getElementById('inputBox').style.border = "3px solid red"
            } else if (props.selectedCoin === "ethereum" && props.ethereumAssets < props.inputNum){
                document.getElementById('inputBox').style.outlineColor = "red"
                document.getElementById('inputBox').style.border = "3px solid red"
            } else if (props.selectedCoin === "stellar" && props.stellarAssets < props.inputNum){
                document.getElementById('inputBox').style.outlineColor = "red"
                document.getElementById('inputBox').style.border = "3px solid red"
            } else if (props.selectedCoin === "tether" && props.tetherAssets < props.inputNum){
                document.getElementById('inputBox').style.outlineColor = "red"
                document.getElementById('inputBox').style.border = "3px solid red"
            } else {
                if(props.selectedCoin === "bitcoin"){
                    props.setBitcoinAssets(props.bitcoinAssets - props.inputNum)
                } else if (props.selectedCoin === "ethereum"){
                    props.setEthereumAssets(props.ethereumAssets - props.inputNum)
                } else if (props.selectedCoin === "stellar"){
                    props.setStellarAssets(props.stellarAssets - props.inputNum)
                } else if (props.selectedCoin === "tether"){
                    props.setTetherAssets(props.tetherAssets - props.inputNum)
                }
                props.setCurrentBalance(props.currentBalance + (props.price * props.inputNum))
                document.getElementById('inputBox').style.outlineColor = "blue"
                document.getElementById('inputBox').style.border = "1px solid grey"
            }   
        }
    }

    useEffect(() => {
        props.setSelectedCoin("")
        props.setPrice(0.00)
        // eslint-disable-next-line
    }, [buy])

    return (
        <div className="horzBox">
            <form>
                <div id="buyOrSell">
                    <p value="buy" className={props.buy === true ? "active buy" : "buy"} onClick={buyOrSell}>Buy</p>
                    <p value="sell" className={props.buy === false ? "active sell" : "sell"} onClick={buyOrSell}>Sell</p>
                </div>
                <div id="selections">
                {props.buy ? (
                <div id="buyActive">
                <p value="current">Balance</p>
                <SwapHorizIcon />
                <select id="options" onChange={currentCoin}>
                    <option value={4}>
                        Select Coin
                    </option>
                    <option value={0}>
                        Bitcoin
                    </option>
                    <option value={1}>
                        Ethereum
                    </option>
                    <option value={2}>
                        Stellar
                    </option>
                    <option value={3}>
                        Tether
                    </option>
                </select>
                </div>
                ) : (
                <div id="sellActive">
                <select id="options" onChange={currentCoin}>
                    <option value={4}>
                        Select Coin
                    </option>
                    <option value={0}>
                        Bitcoin
                    </option>
                    <option value={1}>
                        Ethereum
                    </option>
                    <option value={2}>
                        Stellar
                    </option>
                    <option value={3}>
                        Tether
                    </option>
                </select>
                <SwapHorizIcon />
                <p value="current">Balance</p>
                </div>
                )}
                </div>
                <div id="horzBox-info">
                    <p>Today's Price: <br/> <span>{numeral(props.price).format('0,0.00')}</span></p>
                    <input id="inputBox" type="number" placeholder="1" onChange={unitsChange}/>
                    <p> Total Price: <br/> <span>{numeral(props.price * props.inputNum).format('0,0.00')}</span></p>
                </div>
                <button id="confirm" onClick={confirm}>Confirm</button>
            </form>


        </div>
    )
}

export default HorzBox
