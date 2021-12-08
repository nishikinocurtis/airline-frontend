import React, {useEffect, useState} from "react";
import {Card, Table, Tag, Space, DatePicker, Button} from "antd";
import {statusColor} from "../../lib/statusTag";
import {ticketColumns} from "../../lib/flightData";
import {staffViewFlights, viewAgentFlights, viewCustomerFlights, viewCustomersByNumber} from "../../lib/requests";
import moment from "moment";
import {dateTimeFormat} from "../../lib/dateFormat";
import {customerInterfaceColumns} from "../../lib/flightData";

const {RangePicker} = DatePicker;

export default function StaffViewFlights(props) { //view my flights

    const [flights, setFlights] = useState([]);

    const handleClick = (flightNum) => () => {

    }

    const staffInterfaceColumns = [
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
                    <Button onClick={handleClick(record.flightNum)}> Check {record.flightNum}</Button>
                </Space>
            )
        }
    ];

    const handleDateRangeChange = (values) => {
        staffViewFlights(props.username.split('@').slice(-1)[0],
            values[0].startOf('day').format(dateTimeFormat),
            values[1].endOf('day').format(dateTimeFormat)).then((response) => {
            if (response.status == '200') {
                return response.data
            }
            return [];
        }).then((response) => {
            let counter = 1;
            console.log("response", response);
            let tableData = response.map((record) => {
                record['key'] = counter.toString();
                counter += 1;
                return record;
            });
            setFlights(tableData);
        })
    }

    useEffect(() => {
        let dateTo = moment().add(30, "days").format(dateTimeFormat);
        staffViewFlights(props.username.split('@').slice(-1)[0], moment().format(dateTimeFormat), dateTo).then((response) => {
                if (response.status == '200') {
                    return response.data;
                }
                return [];
        }).then((response) => {
                let counter = 1;
                console.log("response", response);
                let tableData = response.map((record) => {
                    record['key'] = counter.toString();
                    counter += 1;
                    return record;
                });
                setFlights(tableData);
        }).catch(e => console.log(e))

    }, [])


    return (
        <Card title={"Welcome, " + props.username + "!"}>
            <RangePicker
                onChange={handleDateRangeChange}
                defaultValue={[moment(), moment().add(30, "days")]}
            />
            <Table columns={staffInterfaceColumns} dataSource={flights} />
        </Card>
    )
}