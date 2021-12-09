import {Card, Form, Input, Button, DatePicker, message} from 'antd';
import React, {useState} from "react";

import {agentLogin, createFlight, customerLogin, getPermission, staffLoginVerification} from "../../lib/requests";
import {dateTimeFormat} from "../../lib/dateFormat";

export default function CreateFlight(props) {

    const onFinish = (values) => {
        let body = values;
        body['deptTime'] = body['deptTime'].format(dateTimeFormat);
        body['arriTime'] = body['arriTime'].format(dateTimeFormat);
        createFlight(body).then((response) => {
            if (response.status == '200') {
                return response.data;
            }
        }).then((response) => {
            if (response) {
                message.success("Created Successfully!")
            }
        })
    }

    return (
        <Card title={"Welcome, " + props.username + "!"}>
            <Form
                name="create-flight"
                className="create-flight"
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
                    <Input placeholder="Flight No." />
                </Form.Item>
                <Form.Item
                    name="deptPort"
                    rules={[{required: true, message: "Please input departurePort"}]}>
                    <Input placeholder="departurePort" />
                </Form.Item>
                <Form.Item
                    name="deptTime"
                    rules={[{required: true, message: "Please select departureTime"}]}>
                    <DatePicker showTime format={dateTimeFormat}/>
                </Form.Item>
                <Form.Item
                    name="arriPort"
                    rules={[{required: true, message: "Please input arrivalPort"}]}>
                    <Input placeholder="arrivalPort" />
                </Form.Item>
                <Form.Item
                    name="arriTime"
                    rules={[{required: true, message: "Please select arrivalTime"}]}>
                    <DatePicker showTime format={dateTimeFormat}/>
                </Form.Item>
                <Form.Item
                    name="airplaneId"
                    rules={[{required: true, message: "airplaneId"}]}>
                    <Input placeholder="airplaneId" />
                </Form.Item>
                <Form.Item
                    name="status"
                    rules={[{required: true, message: "Please input status"}]}>
                    <Input placeholder="status" />
                </Form.Item>
                <Form.Item
                    name="price"
                    rules={[{required: true, message: "Please input price"}]}>
                    <Input placeholder="price" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}