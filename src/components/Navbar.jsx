import React, { useState, useEffect } from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons'
import {
    HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined
} from '@ant-design/icons'

const Navbar = () => {
    const [screenSize, setScreenSize] = useState(null)
    const [activeMenu, setActiveMenu] = useState(true)

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()
        return window.removeEventListener('resize', handleResize);

    }, [])

    useEffect(() => {
        if (screenSize < 768) {
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }
    }, [screenSize])

    return (
        <div id="nav-container">
            <div id="logo-container">
                <Avatar src={'https://i.ibb.co/Z11pcGG/cryptocurrency.png'} />
                <Typography.Title level={2} className="logo" >
                    <Link to="/home">CryptoVerse</Link>
                </Typography.Title>
                <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>
            </div>
            {activeMenu && (
                <Menu theme="dark">
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to="/home">Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />}>
                        <Link to="/exchanges">Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />}>
                        <Link to="/cryptocurrencies">CryptoCurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />}>
                        <Link to="/news">News</Link>
                    </Menu.Item>
                </Menu>

            )}
        </div>
    )
}

export default Navbar