import React from 'react'
import { Line } from 'react-chartjs-2'
import { Row, Col, Typography } from 'antd'

const { Title } = Typography;

const Charts = ({ currentPrice, coinName, coinHistory }) => {

    const coinPrice = []
    const coinTimeStamp = []

    for (let i = 0; i < coinHistory?.history?.length; i++) {
        coinPrice.push(coinHistory?.history[i].price)
        coinTimeStamp.push(new Date(coinHistory?.history[i].timestamp).toLocaleDateString());
    }

    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }

    return (
        <div>
            <Row className="chart-header">
                <Title level={2} className="chart-title">
                    {coinName} Price Chart
                </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change"> Price Change:{coinHistory?.change} %</Title>
                    <Title level={5} className="current-price">Current Price: $ {currentPrice} </Title>
                </Col>
            </Row>
            <Line data={data} options={options} />

        </div>
    )
}

export default Charts
