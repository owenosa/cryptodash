import React, { useEffect, useState, useCallback } from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';
import './SmallBox.css';

function SmallBox(props) {
    const [chartNums, setChartNums] = useState([])
    const [chartLabels, setChartLabels] = useState([])
    const [chartData, setChartData] = useState({})

    const x = [];
    const y = [];

const fetchData = useCallback(async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=1`
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
    // eslint-disable-next-line 
  }, [props]);

  const chart = useCallback(async () => {
    await fetchData();

    setChartData({
      labels: chartLabels,
      datasets: [
        {
          label: "$",
          data: chartNums,
          backgroundColor: ["rgba(0,0,0,0.09)"],
          borderColor: `${props.color}`,
          borderWidth: 3,
          borderJoinStyle: "round",
          borderCapStyle: "round",
          pointRadius: 0,
          pointHitRadius: 10,
          lineTension: 0.2
        }
      ]
    });
  }, [chartNums, chartLabels, fetchData, props.color]);

  useEffect(() => {
    chart();
  }, [chart]);

    return (
        <div id={props.id} className="smallBox">
            <div className="smallBox_info">
                <img className="smallBox-icon" src={props.image} alt={props.symbol}/>
                <h2>{props.title}</h2>
            </div>
            
            <div className="smallBox_numbers">
                <h2 className="smallBox-price">$ {numeral(props.currentPrice).format('0,0.00')}</h2>
                <h5 className="smallBox-roc">{props.percentChange}</h5>
            </div>
            
            <div className="smallBox_graph">
                <Line data={chartData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
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
                      },
                    }}/>  
            </div>
        </div>
    )
}

export default SmallBox
