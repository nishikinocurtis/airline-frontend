import React, {useEffect, useState} from "react";
import {Card, Table, Tag, Space} from "antd";
import {statusColor} from "../../lib/statusTag";
import {ticketColumns} from "../../lib/flightData";
import {viewAgentFlights, viewCustomerFlights} from "../../lib/requests";
import moment from "moment";
import {dateTimeFormat} from "../../lib/dateFormat";

export default function ViewFlights(props) { //view my flights
    const [flights, setFlights] = useState([]);

    let columns = ticketColumns
    if (props.columns) {columns = props.columns;}

    useEffect(() => {
        if (props.type == "agent") {
            columns = props.columns;
            let dateFrom = moment().subtract(1, "year").format(dateTimeFormat);
            viewAgentFlights(props.username, dateFrom, moment().format(dateTimeFormat)).then((response) => {
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
        } else {
            viewCustomerFlights(props.username).then((response) => {
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
        }

    }, [])

    console.log(props);
    console.log(columns);
    //for testing ONLY
    const data = [
        {
            key: '1',
            uid: "123",
            ticket_id: "TK2021110600001",
            flight_id: "MU682",
            dept: "PVG",
            arri: "JFK",
            dept_time: "2021-11-06 08:00",
            arri_time: "2021-11-06 21:00",
            status: ['upcoming']
        },
        {
            key: '2',
            uid: "123",
            ticket_id: "TK2021110400001",
            flight_id: "MU681",
            dept: "JFK",
            arri: "PVG",
            dept_time: "2021-11-04 08:00",
            arri_time: "2021-11-04 21:00",
            status: ['finished']
        }
    ]

    return (
        <Card title={"Welcome, " + props.username + "!"}>
            <Table columns={columns} dataSource={flights} />
        </Card>
    )
}