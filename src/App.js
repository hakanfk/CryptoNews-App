import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd'
import { Navbar, HomePage, Exchanges, Cryptocurrencies, CryptoDetails, News } from './components'
import './Appcss.css'

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/home">
                <HomePage />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
            </Switch>
          </div>
        </Layout>
      </div>
      <div className="footer">
        <Typography.Title level={5} style={{ color: "white" }}>
          ____CryptoVerse____<br />
          All Rights Reserved
        </Typography.Title>
        <Space>
          <Link to="/home">
            HomePage
          </Link>
          <Link to="/exchanges">
            Exchanges
          </Link>
          <Link to="/news">
            News
          </Link>
        </Space>
      </div>

    </div>
  );
}

export default App;
