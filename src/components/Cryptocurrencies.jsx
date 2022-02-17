import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import ReactLoading from 'react-loading';

import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({ simplified }) => {

    const count = simplified ? 10 : 100;
    const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([])
    const [text, setText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    console.log(cryptos);

    const handleDown = (e) => {
        if (e.key === "Enter") {
            setSearchTerm(text)
        }
    }

    useEffect(() => {
        setCryptos(cryptoList?.data?.coins)

        const filteredData = cryptoList?.data?.coins?.filter((coin) => (coin.name.toLowerCase().includes(searchTerm.toLowerCase())))
        setCryptos(filteredData)

    }, [cryptoList, searchTerm])

    if (isFetching) {
        return (
            <ReactLoading className="react-loader" type="spin" color="blue" height={225} width={125} />
        )
    }

    return (
        <div>
            {!simplified ? <div className="search-crypto" >
                <Input placeholder="Search Crypto..." onKeyDown={(e) => handleDown(e)} onChange={(e) => setText(e.target.value)} />
            </div> : ""}

            <Row gutter={[32, 32]} id="crypto-card-container" >
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} key={currency.id} id="crypto-card">
                        <Link to={`/crypto/${currency.id}`} >
                            <Card title={`${currency.rank}. ${currency.name} (${currency.symbol})`}
                                extra={<img alt="" className="crypto-image" src={currency.iconUrl}
                                    hoverable />}>
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Cryptocurrencies
