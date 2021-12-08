import {Button, Space, Tag} from "antd";
import {statusColor} from "./statusTag";
import React from "react";

export const ticketColumns = [
    {
        title: "Ticket No.",
        dataIndex: "ticketId",
        key: "ticket"
    },
    {
        title: "Airline",
        dataIndex: "airlineName",
        key: "airline"
    },
    {
        title: "Flight No.",
        dataIndex: "flightNum",
        key: "flight"
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: "Dept. Airport",
        dataIndex: "deptPort",
        key: "dept"
    },
    {
        title: "Arri. Airport",
        dataIndex: "arriPort",
        key: "arri"
    },
    {
        title: "Dept. Time",
        dataIndex: "deptTime",
        key: "dept_time"
    },
    {
        title: "Arri. Time",
        dataIndex: "arriTime",
        key: "arri_time"
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: tags => (
            <>
                {
                    <Tag color={statusColor[tags]} key={tags}>
                        {tags.toUpperCase()}
                    </Tag>
                }
            </>
        )
    },
];

export const customerInterfaceColumns = [
    {
        title: "Flight No.",
        dataIndex: "flightNum",
        key: "flight"
    },
    {
        title: "Airplane",
        dataIndex: "airplaneId",
        key: "airplane"
    },
    {
        title: "Dept. Airport",
        dataIndex: "departurePort",
        key: "dept"
    },
    {
        title: "Arri. Airport",
        dataIndex: "arrivalPort",
        key: "arri"
    },
    {
        title: "Dept. Time",
        dataIndex: "departureTime",
        key: "dept_time"
    },
    {
        title: "Arri. Time",
        dataIndex: "arrivalTime",
        key: "arri_time"
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: tags => (
            <>
                {
                    <Tag color={statusColor[tags]} key={tags}>
                        {tags.toUpperCase()}
                    </Tag>
                }
            </>
        )
    },
    {
        title: "Action",
        key: 'action',
        render: (text, record) => (
            <Space size={"middle"}>
                <Button disabled={record.status==("finished"||"onBoarding")}>Book {record.flightNum}</Button>
            </Space>
        )
    }
];

export const agentInterfaceColumns = [
    {
        title: "User ID",
        dataIndex: 'email',
        key: 'uid',
    },
    {
        title: "Flight No.",
        dataIndex: "flightNum",
        key: "flight"
    },
    {
        title: "Dept. Airport",
        dataIndex: "deptPort",
        key: "dept"
    },
    {
        title: "Arri. Airport",
        dataIndex: "arriPort",
        key: "arri"
    },
    {
        title: "Dept. Time",
        dataIndex: "deptTime",
        key: "dept_time"
    },
    {
        title: "Arri. Time",
        dataIndex: "arriTime",
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
                {
                    <Tag color={statusColor[tags]} key={tags}>
                        {tags.toUpperCase()}
                    </Tag>

                }
            </>
        )
    },
]

