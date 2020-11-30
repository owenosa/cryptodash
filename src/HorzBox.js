import React, {useState, useEffect} from 'react'
import './HorzBox.css';
import numeral from 'numeral'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

function HorzBox(props) {
    const [inputNum, setInputNum] = useState(1)
    const [selectedCoin, setSelectedCoin] = useState()
    const [price, setPrice] = useState()
    const [buy, setBuy] = useState(true);

    function unitsChange(e){
        setInputNum(parseInt(e.target.value))
    }

    function buyOrSell(e){
        if(e.target.innerText === "Buy"){
            setBuy(true)
        } else {
            setBuy(false)
        }
    }

    function currentCoin(e){
        if(e.target.options.selectedIndex === 1){
            setSelectedCoin('bitcoin');
            setPrice(props.bitcoinPrice)
        } else if(e.target.options.selectedIndex === 2){
            setSelectedCoin('ethereum');
            setPrice(props.ethereumPrice)
        } else if(e.target.options.selectedIndex === 3){
            setSelectedCoin('stellar');
            setPrice(props.stellarPrice)
        } else if(e.target.options.selectedIndex === 4){
            setSelectedCoin('tether');
            setPrice(props.tetherPrice)
        }
    }

    function confirm(e){
        e.preventDefault()
        if(buy){
            if(props.currentBalance < (price * inputNum)){
                document.getElementById('inputBox').style.outlineColor = "red"
                document.getElementById('inputBox').style.border = "3px solid red"
            } else {
                if(selectedCoin === "bitcoin"){
                    props.setBitcoinAssets(inputNum + props.bitcoinAssets)
                } else if (selectedCoin === "ethereum"){
                    props.setEthereumAssets(inputNum + props.ethereumAssets)
                } else if (selectedCoin === "stellar"){
                    props.setStellarAssets(inputNum + props.stellarAssets)
                } else if (selectedCoin === "tether"){
                    props.setTetherAssets(inputNum + props.tetherAssets)
                }
                props.setCurrentBalance(props.currentBalance - (price * inputNum))
                document.getElementById('inputBox').style.outlineColor = "blue"
                document.getElementById('inputBox').style.border = "1px solid grey"
            }
        } else if (!buy) {
            if(selectedCoin === "bitcoin" && props.bitcoinAssets < inputNum){
                document.getElementById('inputBox').style.outlineColor = "red"
                document.getElementById('inputBox').style.border = "3px solid red"
            } else if (selectedCoin === "ethereum" && props.ethereumAssets < inputNum){
                document.getElementById('inputBox').style.outlineColor = "red"
                document.getElementById('inputBox').style.border = "3px solid red"
            } else if (selectedCoin === "stellar" && props.stellarAssets < inputNum){
                document.getElementById('inputBox').style.outlineColor = "red"
                document.getElementById('inputBox').style.border = "3px solid red"
            } else if (selectedCoin === "tether" && props.tetherAssets < inputNum){
                document.getElementById('inputBox').style.outlineColor = "red"
                document.getElementById('inputBox').style.border = "3px solid red"
            } else {
                if(selectedCoin === "bitcoin"){
                    props.setBitcoinAssets(props.bitcoinAssets - inputNum)
                } else if (selectedCoin === "ethereum"){
                    props.setEthereumAssets(props.ethereumAssets - inputNum)
                } else if (selectedCoin === "stellar"){
                    props.setStellarAssets(props.stellarAssets - inputNum)
                } else if (selectedCoin === "tether"){
                    props.setTetherAssets(props.tetherAssets - inputNum)
                }
                props.setCurrentBalance(props.currentBalance + (price * inputNum))
                document.getElementById('inputBox').style.outlineColor = "blue"
                document.getElementById('inputBox').style.border = "1px solid grey"
            }   
        }
    }

    useEffect(() => {
        setSelectedCoin("")
        setPrice(0.00)
    }, [buy])

    return (
        <div className="horzBox">
            <form>
                <div id="buyOrSell">
                    <p value="buy" className={buy === true ? "active buy" : "buy"} onClick={buyOrSell}>Buy</p>
                    <p value="sell" className={buy === false ? "active sell" : "sell"} onClick={buyOrSell}>Sell</p>
                </div>
                <div id="selections">
                {buy ? (
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
                    <p>Today's Price: <br/> <span>{numeral(price).format('0,0.00')}</span></p>
                    <input id="inputBox" type="number" placeholder="1" onChange={unitsChange}/>
                    <p> Total Price: <br/> <span>{numeral(price * inputNum).format('0,0.00')}</span></p>
                </div>
                <button id="confirm" onClick={confirm}>Confirm</button>
            </form>


        </div>
    )
}

export default HorzBox
