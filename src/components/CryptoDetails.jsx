import React, { useState, useEffect } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import ReactLoading from 'react-loading';
import { Col, Row, Typography, Select } from 'antd'
import {
    MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined,
    StopOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined, TrophyFilled, CheckOutlined
} from '@ant-design/icons'
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi'
import Charts from './Charts';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {

    const { coinId } = useParams()
    const [timePeriod, setTimePeriod] = useState('7d');
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
    const cryptoDetails = data?.data?.coin;
    const history = coinHistory?.data;

    useEffect(() => { },
        [timePeriod])

    if (isFetching) {
        return <ReactLoading className="react-loader" type="spin" color="blue" height={225} width={125} />
    }

    const time = ['1h', '4h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
    const stats = [
        { title: 'Price to USD', value: `$${cryptoDetails?.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24H Volume', value: `$${cryptoDetails?.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$${cryptoDetails?.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All Time High', value: `$${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyFilled /> }
    ]
    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails?.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails?.totalSupply && millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails?.circulatingSupply && millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];

    console.log(data);

    return (
        <>
            <Col id="coin-detail-container">
                <Col id="coin-heading-container">
                    <Title level={2} className="coin-name" >
                        {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
                    </Title>
                    <p>
                        {cryptoDetails?.name} live price in USD.
                        View value, statistics, market cap and so on...
                    </p>
                    <Select className="select-timeperiod"
                        defaultValue="7d" placeholder="Select Time Period" onChange={(value) => setTimePeriod(value)}>
                        {time.map((date) => (<Option key={date}>{date}</Option>))}
                    </Select>
                </Col>

                <Charts coinHistory={history} coinName={cryptoDetails?.name}
                    currentPrice={cryptoDetails?.price && millify(cryptoDetails?.price)} />

                <Col id="stats-container">
                    <Col classsName="coin-value-statistics">
                        <Col classsName="coin-value-statistics-heading">
                            <Title level={3} className="coin-details-heading">
                                {cryptoDetails?.name} Value Statistics
                            </Title>
                            <p>An overview of stats</p>
                        </Col>
                        {stats.map(({ title, icon, value }) => (
                            <Col classsName="coin-stats" id="coin-stats">
                                <Col id="coin-stats-name">
                                    <Text>{icon}</Text>
                                    <Text> {title}</Text>
                                </Col>
                                <Text id="stats">{value}</Text>

                            </Col>
                        )
                        )}
                    </Col>
                    <Col classsName="coin-value-statistics">
                        <Col classsName="coin-value-statistics-heading">
                            <Title level={3} className="coin-details-heading">
                                {cryptoDetails?.name} Value Statistics
                            </Title>
                            <p>An overview of stats</p>
                        </Col>
                        {genericStats.map(({ title, icon, value }) => (
                            <Col classsName="coin-stats" id="coin-stats">
                                <Col id="coin-stats-name">
                                    <Text>{icon}</Text>
                                    <Text> {title}</Text>
                                </Col>
                                <Text id="stats">{value}</Text>

                            </Col>
                        )
                        )}
                    </Col>
                </Col>

                <Row classsName="coin-desc-link" style={{ marginTop: "27px" }}>
                    <Col className="coin-desc">
                        <Title level={3} className="coin-details-heading">
                            What is {cryptoDetails?.name}
                        </Title>
                        {HTMLReactParser(cryptoDetails?.description)}
                    </Col>
                    <Col className="coin-links" style={{ marginLeft: "130px" }}>
                        <Title level={3} className="coin-details-heading">
                            Links for {cryptoDetails?.name}
                        </Title>
                        {cryptoDetails?.links.map((link) => (
                            <Row className="coin-link" key={link.name}>
                                <Title level={5} className="link-name">{link.type} </Title>
                                <a href={link.url} >
                                    {link.name}
                                </a>
                            </Row>
                        ))}
                    </Col>
                </Row>


            </Col>
        </>
    )
}

export default CryptoDetails
