import {Card, Form, Input, Button} from 'antd';
import React, {useState} from "react";
import {createAirplane} from "../../lib/requests";

export default function CreateAirplane(props) {

    const onFinish = (values) => {
        createAirplane(values).then((response) => {
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
                name="create-airplane"
                className="create-airplane"
                onFinish={onFinish}
            >
                <Form.Item
                    name="airlineName"
                    initialValue={props.username.split('@').slice(-1)[0]}
                    rules={[{required: true, message: "Please input Airline Name"}]}>
                    <Input placeholder={"airlineName"} />
                </Form.Item>
                <Form.Item
                    name="airplaneId"
                    rules={[{required: true, message: "Please input Airplane Id"}]}>
                    <Input placeholder="e.g. B737-2001" />
                </Form.Item>
                <Form.Item
                    name="seats"
                    rules={[{required: true, message: "Please input seats no."}]}>
                    <Input placeholder="e.g. 201" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}