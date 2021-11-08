import {Card, Form, Input, Button} from 'antd';
import React, {useState} from "react";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

export default function LoginCard() {
    let navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('customer');

    const onTabChange = (key) => {
        setActiveTab(key);
    }
    const onFinish = (values) => {
        // loginRequest(values.username, md5(values.password), activeTab)
        console.log(values)
        // eslint-disable-next-line no-restricted-globals
        navigate("/" + activeTab, {replace: true})
    }

    const tabList = [
        {key: 'customer', tab: 'Customer'},
        {key: 'agent', tab: 'Booking Agent'},
        {key: 'staff', tab: 'Airline Staff'}
    ]

    const usernameMessage = {
        customer: "E-mail",
        agent: "E-mail",
        staff: "Username"
    }

    return (
        <Card
            style={{width: '30%', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}
            tabList={tabList}
            activeTab={activeTab}
            tabBarExtraContent={<a href="/">Back</a>}
            onTabChange={onTabChange}
        >
            <Form
                name="login"
                className="login-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{required: true, message: "Please input your " + usernameMessage[activeTab]}]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />}
                           placeholder={usernameMessage[activeTab]} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: "Please input your password"}]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}