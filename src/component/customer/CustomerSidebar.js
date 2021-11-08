import {CarryOutOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {Menu} from "antd";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const {SubMenu} = Menu;

export default function CustomerSidebar({updateSelection}) {
    const tagList = {
        "1": "Search flights",
        "2": "Purchase tickets",
        "3": "My flights",
        "4": "Track spending",
        "5": "Logout",
    }
    const navigate = useNavigate();

    const handleSidebarClick = (item) => {
        if (tagList[item.key] == "Logout") {
            // clear local account information
            navigate("/", {replace: true})
        }
        updateSelection(tagList[item.key])
    }

    useEffect(() => {
        updateSelection("Search flights")
    }, [])

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            onClick={handleSidebarClick}
            style={{height: '100%', borderRight: 0}}
        >
            <SubMenu key="sub1" icon={<CarryOutOutlined />} title="Booking">
                <Menu.Item key="1">{tagList['1']}</Menu.Item>
                <Menu.Item key="2">{tagList['2']}</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<UserOutlined />} title="Mine">
                <Menu.Item key="3">{tagList['3']}</Menu.Item>
                <Menu.Item key="4">{tagList['4']}</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<SettingOutlined />} title="Operation">
                <Menu.Item key="5">{tagList['5']}</Menu.Item>
            </SubMenu>
        </Menu>
    )
}