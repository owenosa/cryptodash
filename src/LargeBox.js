import React, { useEffect, useState, useCallback } from 'react';
import {Line} from 'react-chartjs-2';
import './LargeBox.css';

function LargeBox() {
    const [chartNums, setChartNums] = useState([])
    const [chartLabels, setChartLabels] = useState([])
    const [chartData, setChartData] = useState({})
    const [currentTime, setCurrentTime] = useState(1);
    const [currentCoin, setCurrentCoin] = useState('bitcoin')

    const x = [];
    const y = [];

    function selectTime(e){
        if(e.target.innerText === "Day"){
            setCurrentTime(1);
        } else if (e.target.innerText === "Week") {
            setCurrentTime(7)
        } else if (e.target.innerText === "Month") {
            setCurrentTime(30)
        } else if (e.target.innerText === "Year") {
            setCurrentTime(365)
        }
    }

    function selectCoin(e){
        if(e.target.options.selectedIndex === 0){
            setCurrentCoin('bitcoin');
        } else if(e.target.options.selectedIndex === 1){
            setCurrentCoin('ethereum');
        } else if(e.target.options.selectedIndex === 2){
            setCurrentCoin('stellar');
        } else if(e.target.options.selectedIndex === 3){
            setCurrentCoin('tether');
        }
    }

    

    const fetchData = useCallback(async () => {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${currentCoin}/market_chart?vs_currency=usd&days=${currentTime}`
        );
        const data = await response.json();
        if (data && data.prices) {
          for (let i = 0; i < data.prices.length; i++) {
            x.push(data.prices[i][0]);
            setChartLabels(x);
          }
    
          for (let i = 0; i < data.prices.length; i++) {
            y.push(data.prices[i][1]);
            setChartNums(y);
          }
        }
      }, [currentCoin, currentTime]);

      const chart = useCallback(async () => {
        await fetchData();
    
        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: "$",
              data: chartNums,
              backgroundColor: ["rgba(0,0,0,0.09)"],
              borderColor: "black",
              borderWidth: 3,
              borderJoinStyle: "round",
              borderCapStyle: "round",
              pointRadius: 0,
              pointHitRadius: 10,
              lineTension: 0.2
            }
          ]
        });
      }, [chartNums, chartLabels, fetchData]);

    useEffect(() => {
        chart()
    }, [chart])

    return (
        <div className="largeBox">
            <div className="largeBox_info">
                <select id="options" onChange={selectCoin}>
                    <option value="btc" >
                        Bitcoin
                    </option>
                    <option value="xzc">
                        Ethereum
                    </option>
                    <option value="trc">
                        Stellar
                    </option>
                    <option value="etc">
                        Tether
                    </option>
                </select>
                <h2>Chart</h2>
            </div>

            <div className="largeBox_selectors">
                <ul>
                    <li className={currentTime === 1 ? "active" : ""} onClick={selectTime}>Day</li>
                    <li className={currentTime === 7 ? "active" : ""} onClick={selectTime}>Week</li>
                    <li className={currentTime === 30 ? "active" : ""} onClick={selectTime}>Month</li>
                    <li className={currentTime === 365 ? "active" : ""} onClick={selectTime}>Year</li>
                </ul>
            </div>

            <div className="largeBox_graph">
                <Line data={chartData} options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    title: {text: 'ThickBoyz', display: false},
                    legend: {display: false},
                    layout: {
                        padding: {
                          left: 0,
                          right: 0,
                          top: 0,
                          bottom: 0
                        }
                      },
                      scales: {
                        xAxes: [{
                          display: false,
                          gridLines: {}
                        }],
                        yAxes: [{
                          display: false,
                          gridLines: {}
                        }]
                      },
                      tooltips: {
                        callbacks: {
                          //This removes the tooltip title
                          title: function() {}
                       },
                        //this removes legend color
                        displayColors: false,
                        yPadding: 10,
                        xPadding: 10,
                        position: 'nearest',
                        caretSize: 10,
                        backgroundColor: 'rgba(255,255,255,.9)',
                        bodyFontSize: 15,
                        bodyFontColor: '#303030' 
                      }
                    }}/>   
            </div> 
        </div>
    )
}
export default LargeBox
