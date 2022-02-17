import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Cryptocurrencies, News } from '.'
import ReactLoading from 'react-loading';


const HomePage = () => {
    const { data, isFetching } = useGetCryptosQuery(10);
    const { Title } = Typography;
    const globalStats = data?.data?.stats;

    if (isFetching) {
        return (
            <ReactLoading className="react-loader" type="spin" color="blue" height={225} width={125} />
        )
    }
    console.log(data);

    return (
        <div >
            <Title level={2} className="heading">
                Global Crypto Stats
            </Title>
            <Row>
                <Col span={12}>
                    <Statistic title="Total Crypto Currencies" value={globalStats.total} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Exchange" value={millify(globalStats.totalExchanges)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total 24H Volume" value={millify(globalStats.total24hVolume)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} />
                </Col>
            </Row>
            <Row className="home-heading-container">
                <Title level={2} className="home-title" >Top 10 Crypto Currencies</Title>
                <Title level={3} className="show-more" > <Link to="/cryptocurrencies"> Show More </Link></Title>
            </Row>
            <Cryptocurrencies simplified />
            <Row className="home-heading-container">
                <Title level={2} className="home-title" >Latest News</Title>
                <Title level={3} className="show-more" > <Link to="/news"> Show More </Link></Title>
            </Row >
            <News simplified />
        </div>
    )
}

export default HomePage
