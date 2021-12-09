import {Card, Form, Input, Button, message} from 'antd';
import React, {useState} from "react";
import {addAffiliation} from "../../lib/requests";

export default function AddBookingAgent(props) {

    const onFinish = (values) => {
        addAffiliation(values.username, values.af).then((response) => {
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
                name="add-af"
                className="add-af"
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{required: true, message: "Please input Agent ID"}]}>
                    <Input placeholder={"UUID"} />
                </Form.Item>
                <Form.Item
                    name="af"
                    initialValue={props.username.split('@').slice(-1)[0]}
                    rules={[{required: true, message: "Please input Airline Name"}]}>
                    <Input placeholder="Airline Name" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}