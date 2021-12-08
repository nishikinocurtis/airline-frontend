import {Card, Form, Input, Button} from 'antd';
import React, {useState} from "react";
import {createAirport} from "../../lib/requests";

export default function EditAirport(props) {

    const onFinish = (values) => {
        createAirport(values).then((response) => {
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
                name="create-airport"
                className="create-airport"
                onFinish={onFinish}
            >
                <Form.Item
                    name="name"
                    rules={[{required: true, message: "Please input Airport Name"}]}>
                    <Input placeholder={"IATA Code, e.g. SHA"} />
                </Form.Item>
                <Form.Item
                    name="city"
                    rules={[{required: true, message: "Please input Airport City"}]}>
                    <Input placeholder="e.g. Shanghai" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}