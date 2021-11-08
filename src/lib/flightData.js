import {Button, Space, Tag} from "antd";
import {statusColor} from "./statusTag";
import React from "react";

export const ticketColumns = [
    {
        title: "Ticket No.",
        dataIndex: "ticket_id",
        key: "ticket"
    },
    {
        title: "Flight No.",
        dataIndex: "flight_id",
        key: "flight"
    },
    {
        title: "Dept. Airport",
        dataIndex: "dept",
        key: "dept"
    },
    {
        title: "Arri. Airport",
        dataIndex: "arri",
        key: "arri"
    },
    {
        title: "Dept. Time",
        dataIndex: "dept_time",
        key: "dept_time"
    },
    {
        title: "Arri. Time",
        dataIndex: "arri_time",
        key: "arri_time"
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: tags => (
            <>
                {tags.map(status => (
                    <Tag color={statusColor[status]} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                ))
                }
            </>
        )
    },
];

export const customerInterfaceColumns = [
    {
        title: "Flight No.",
        dataIndex: "flight_id",
        key: "flight"
    },
    {
        title: "Dept. Airport",
        dataIndex: "dept",
        key: "dept"
    },
    {
        title: "Arri. Airport",
        dataIndex: "arri",
        key: "arri"
    },
    {
        title: "Dept. Time",
        dataIndex: "dept_time",
        key: "dept_time"
    },
    {
        title: "Arri. Time",
        dataIndex: "arri_time",
        key: "arri_time"
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price"
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: tags => (
            <>
                {tags.map(status => (
                    <Tag color={statusColor[status]} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                ))
                }
            </>
        )
    },
    {
        title: "Action",
        key: 'action',
        render: (text, record) => (
            <Space size={"middle"}>
                <Button disabled={record.status==("finished"||"onBoarding")}>Book {record.flight_id}</Button>
            </Space>
        )
    }
];

export const agentInterfaceColumns = [
    {
        title: "User ID",
        dataIndex: 'uid',
        key: 'uid',
    },
    {
        title: "Flight No.",
        dataIndex: "flight_id",
        key: "flight"
    },
    {
        title: "Dept. Airport",
        dataIndex: "dept",
        key: "dept"
    },
    {
        title: "Arri. Airport",
        dataIndex: "arri",
        key: "arri"
    },
    {
        title: "Dept. Time",
        dataIndex: "dept_time",
        key: "dept_time"
    },
    {
        title: "Arri. Time",
        dataIndex: "arri_time",
        key: "arri_time"
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price"
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: tags => (
            <>
                {tags.map(status => (
                    <Tag color={statusColor[status]} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                ))
                }
            </>
        )
    },
]

