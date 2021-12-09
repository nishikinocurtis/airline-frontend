import {CarryOutOutlined, FundViewOutlined, SendOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {Menu} from "antd";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getPermission} from "../../lib/requests";

const {SubMenu} = Menu;

export default function StaffSidebar(props) {
    const tagList = {
        // Flight Management
        "1": "View flights",
        "2": "Create flight",
        "3": "Change flight status",
        "4": "Add airplane",
        "5": "Add airport",
        // Statistics
        "6": "Frequent customers",
        "7": "Revenue comparison",
        "8": "Top destinations",
        "9": "Sale report",
        "13": "Top agents",
        // Operation
        "10": "Add booking agent",
        "11": "Grant permission",
        "12": "Logout",

    }
    const navigate = useNavigate();

    const handleSidebarClick = (item) => {
        if (tagList[item.key] == "Logout") {
            // clear local account information
            navigate("/", {replace: true})
        }
        props.updateSelection(tagList[item.key])
    }

    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        console.log(props.username.split('@')[0]);
        getPermission(props.username.split('@')[0]).then((response) => {
            if (response.status == '200') {
                return response.data;
            }
            return [];
        }).then((response) => {
            console.log(response)
            setPermissions(response);
        });
    }, [props])

    useEffect(() => {
        props.updateSelection("Sale report")
    }, [])

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['9']}
            defaultOpenKeys={['sub2']}
            onClick={handleSidebarClick}
            style={{height: '100%', borderRight: 0}}
        >
            <SubMenu key="sub1" icon={<SendOutlined />} title="Flight Management">
                <Menu.Item key="1">{tagList['1']}</Menu.Item>
                <Menu.Item key="2" disabled={permissions.indexOf('admin') == -1}>{tagList['2']}</Menu.Item>
                <Menu.Item key="3" disabled={permissions.indexOf('admin') == -1 && permissions.indexOf('operator') == -1}>{tagList['3']}</Menu.Item>
                <Menu.Item key="4" disabled={permissions.indexOf('admin') == -1}>{tagList['4']}</Menu.Item>
                <Menu.Item key="5" disabled={permissions.indexOf('admin') == -1}>{tagList['5']}</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<FundViewOutlined />} title="Statistics">
                <Menu.Item key="6">{tagList['6']}</Menu.Item>
                <Menu.Item key="7">{tagList['7']}</Menu.Item>
                <Menu.Item key="8">{tagList['8']}</Menu.Item>
                <Menu.Item key="9">{tagList['9']}</Menu.Item>
                <Menu.Item key="13">{tagList['13']}</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<SettingOutlined />} title="Operation">
                <Menu.Item key="10" disabled={permissions.indexOf('admin') == -1}>{tagList['10']}</Menu.Item>
                <Menu.Item key="11" disabled={permissions.indexOf('admin') == -1}>{tagList['11']}</Menu.Item>
                <Menu.Item key="12">{tagList['12']}</Menu.Item>
            </SubMenu>
        </Menu>
    )
}