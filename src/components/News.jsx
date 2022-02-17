import React, { useState } from 'react'
import { useGetNewsQuery } from '../services/cryptoNewsApi'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import ReactLoading from 'react-loading';

const { Title, Text } = Typography;
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const News = ({ simplified }) => {
    const [category, setCategory] = useState('crypto')
    const { data, isFetching } = useGetNewsQuery({ newsCategory: category, count: simplified ? 6 : 15 })

    if (isFetching) {
        return <ReactLoading className="react-loader" type="spin" color="blue" height={225} width={125} />
    }
    console.log(data);
    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp='children'
                        onChange={(e) => setCategory(e)}
                        filterOption={(input, option) => (option.children.toLowerCase().indexOf(input.toLowerCase())) > 0}>



                    </Select>
                </Col>
            )}

            {data?.value?.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className='news-card'>
                        <a href={news.url}>
                            <div className='news-image-container'>
                                <Title level={4}>
                                    {news.name}
                                </Title>
                                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                            </div>
                            <p>
                                {news?.description}
                            </p>
                            <div className="provider-container">
                                <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl} />
                                <Text className="news-date">
                                    {moment(news?.datePublished).startOf('ss').fromNow()}
                                </Text>
                            </div>
                        </a>

                    </Card>
                </Col>
            ))}
        </Row>


    )
}

export default News
