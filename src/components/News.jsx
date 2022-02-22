import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { option } = Select;
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('cryptoCurrency');
  const { data: cryptoNews } = useGetCryptoNewsQuery({newsCategory, count: simplified ? 6 : 100});
  const { data } = useGetCryptosQuery(100);
  if (!cryptoNews?.value) return 'Loading...';

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select 
            showSearch
            className='select-news'
            placeholder='Select a news category'
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <option value='cryptoCurrency'>Cryptocurrency</option>
            {data?.data?.coins.map(coin =>  <option value={coin.name}>{coin.name}</option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col key={i} xs={24} sm={12} lg={8}>
          <Card hoverable className='news-card'>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className='news-title' level={4}>{news.name}</Title>
                <img style={{maxWidth: '200px', maxHeight: '100px', borderRadius: "8px"}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt={news.name} />
              </div>
              <p>
                {news.description > 100 
                  ? `${news.description.substring(0, 100)} ....`
                  : news.description
                }
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                  <Text className='provider-name'>{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News