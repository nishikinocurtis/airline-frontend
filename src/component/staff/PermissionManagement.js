import {Card, Form, Input, Button, message} from 'antd';
import React, {useState} from "react";
import {addAffiliation, grantPermission} from "../../lib/requests";

export default function PermissionManagement(props) {

    const onFinish = (values) => {
        grantPermission(values.username, values.permissions).then((response) => {
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
                    rules={[{required: true, message: "Please input username"}]}>
                    <Input placeholder={"Staff username"} />
                </Form.Item>
                <Form.Item
                    name="permissions"
                    initialValue={"viewer"}
                    rules={[{required: true, message: "Please input Airline Name"}]}>
                    <Input placeholder="Permission Type" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}