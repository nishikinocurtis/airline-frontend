import {Card, Form, Input, Button} from 'antd';
import React, {useState} from "react";

import {agentLogin, createFlight, customerLogin, getPermission, staffLoginVerification} from "../../lib/requests";

export default function FlipStatus(props) {

    const onFinish = (values) => {
        createFlight(values).then((response) => {
            if (response.status == '200') {
                return response.data;
            }
        }).then((response) => {
            if (response) {
                alert("Created Successfully!")
            }
        })
    }

    return (
        <Card title={"Welcome, " + props.username + "!"}>
            <Form
                name="change-flight"
                className="change-flight"
                onFinish={onFinish}
            >
                <Form.Item
                    name="airlineName"
                    initialValue={props.username.split('@').slice(-1)[0]}
                    rules={[{required: true, message: "Please input Airline Name"}]}>
                    <Input placeholder={"Airline Name"} />
                </Form.Item>
                <Form.Item
                    name="flightNum"
                    rules={[{required: true, message: "Please input Flight No."}]}>
                    <Input placeholder="Flight No. (required)" />
                </Form.Item>
                <Form.Item
                    name="departurePort"
                    rules={[{required: true, message: "Please input departurePort"}]}>
                    <Input placeholder="departurePort" />
                </Form.Item>
                <Form.Item
                    name="arrivalPort"
                    rules={[{required: true, message: "Please input arrivalPort"}]}>
                    <Input placeholder="arrivalPort" />
                </Form.Item>
                <Form.Item
                    name="airplaneId">
                    <Input placeholder="airplaneId" />
                </Form.Item>
                <Form.Item
                    name="status"
                    rules={[{required: true, message: "Please input new status"}]}>
                    <Input placeholder="status (required)" />
                </Form.Item>
                <Form.Item
                    name="price">
                    <Input placeholder="price" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}